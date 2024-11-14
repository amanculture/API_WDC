(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            { id: "id", alias: "ID", dataType: tableau.dataTypeEnum.int },
            { id: "name", alias: "Name", dataType: tableau.dataTypeEnum.string },
            { id: "email", alias: "Email", dataType: tableau.dataTypeEnum.string },
            // Add more fields as needed
        ];

        var tableSchema = {
            id: "databaseData",
            alias: "Data from Database API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        var apiKey = "test_ifcEpufIrhFZQkmCeyafvrIEo87hUObwqgCKyXVT";  // Replace with your actual API key
        var apiUrl = "https://api.nettoolkit.com/v1/account/test-api-keys"; // Replace with your actual API endpoint

        // Use Fetch or XMLHttpRequest to call your API
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + apiKey,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            var tableData = data.map(item => ({
                created: item.created,
                ip: item.ip,
                // Map other fields as needed
            }));

            table.appendRows(tableData);
            doneCallback();
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();
