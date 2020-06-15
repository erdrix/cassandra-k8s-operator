package sidecarclient

import (
	"fmt"
	"net/http"
	"testing"

	api "github.com/Orange-OpenSource/casskop/pkg/apis/db/v1alpha1"
	csapi "github.com/erdrix/cassandrasidecar-go-client/pkg/cassandrasidecar"
	"github.com/jarcoal/httpmock"
	"github.com/stretchr/testify/assert"
)



func TestPerformRestoreOperation(t *testing.T) {
	assert := assert.New(t)

	restore, err := performRestoreMock(201)
	assert.Nil(err)
	assert.NotNil(restore)

	restore, err = performRestoreMock(500)
	assert.Equal(ErrCassandraSidecarNotReturned201, err)
	assert.Nil(restore)

}

func TestGetRestoreOperation(t *testing.T) {
	assert := assert.New(t)

	restore, err := getRestoreMock(200)
	assert.Nil(err)
	assert.NotNil(restore)

	restore, err = getRestoreMock(500)
	assert.Equal(ErrCassandraSidecarNotReturned200, err)
	assert.Nil(restore)
}


func performRestoreMock(codeStatus int) (*csapi.RestoreOperationResponse, error) {
	defer httpmock.DeactivateAndReset()

	client := newBuildedMockClient()

	sourceDir         := "/var/lib/cassandra/data/downloadedsstables"

	restoreOperationRequest := csapi.RestoreOperationRequest {
		Type_: "restore",
		StorageLocation: storageLocation,
		SnapshotTag: snapshotTag,
		NoDeleteDownloads: noDeleteDownloads,
		SchemaVersion: schemaVersion,
		ExactSchemaVersion: false,
		RestorationPhase: string(api.RestorationPhaseDownload),
		GlobalRequest: true,
		Import_: &csapi.AllOfRestoreOperationRequestImport_{
			Type_: "import",
			SourceDir: sourceDir,
		},
		K8sSecretName: k8sSecretName,
		ConcurrentConnections: concurrentConnections,
	}

	url := fmt.Sprintf("http://%s:%d/operations", ipPodA, DefaultCassandraSidecarPort)

	httpmock.RegisterResponder(http.MethodPost, url,
		func(req *http.Request) (*http.Response, error) {
			return httpmock.NewJsonResponse(
				codeStatus,
				mockRestoreResponse(
					restoreOperationRequest.NoDeleteDownloads,
					restoreOperationRequest.ConcurrentConnections,
					state,
					restoreOperationRequest.SnapshotTag,
					operationID,
					restoreOperationRequest.K8sSecretName,
					restoreOperationRequest.StorageLocation,
					"HARDLINKS",
					"DOWNLOAD",
					restoreOperationRequest.SchemaVersion))
		})


	return client.PerformRestoreOperation("podB", restoreOperationRequest)
}

func getRestoreMock(codeStatus int) (*csapi.RestoreOperationResponse, error) {
	defer httpmock.DeactivateAndReset()

	client := newBuildedMockClient()

	url := fmt.Sprintf("http://%s:%d/operations/%s", ipPodA, DefaultCassandraSidecarPort, operationID)

	httpmock.RegisterResponder(http.MethodGet, url,
		func(req *http.Request) (*http.Response, error) {
			return httpmock.NewJsonResponse(
				codeStatus,
				mockRestoreResponse(
					noDeleteDownloads,
					concurrentConnections,
					state,
					snapshotTag,
					operationID,
					k8sSecretName,
					storageLocation,
					"HARDLINKS",
					"DOWNLOAD",
					schemaVersion))
		})

	return client.GetRestoreOperation("podA", operationID)
}

