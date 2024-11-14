myConnector.getSchema = function (schemaCallback) {
  var cols = [
    { id: "id", alias: "ID", dataType: tableau.dataTypeEnum.string },
    { id: "urn", alias: "URN", dataType: tableau.dataTypeEnum.string },
    { id: "username", alias: "Username", dataType: tableau.dataTypeEnum.string },
    { id: "first_name", alias: "First Name", dataType: tableau.dataTypeEnum.string }
  ];

  var tableSchema = {
    id: "linkedinData",
    alias: "LinkedIn Data",
    columns: cols
  };

  schemaCallback([tableSchema]);
};
myConnector.getData = function (table, doneCallback) {
  var apiKey = "8b2d55889bmshafe33f821c7a253p15f9bejsnd92ff5f9a206";  // Replace with your RapidAPI key
  var apiUrl = "https://linkedin-data-api.p.rapidapi.com/";

  var endpoint = "your_endpoint"; // Replace with the correct endpoint

  fetch(apiUrl + endpoint, {
    method: 'GET',
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "linkedin-data-api.p.rapidapi.com",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    // Assuming the API response is in the format: { "data": [{...}] }
    var tableData = data.data.map(item => ({
      id: item.id,  // Assuming 'id' is present in the API response
      urn: item.urn,  // Assuming 'urn' is present in the API response
      username: item.username,  // Assuming 'username' is present
      first_name: item.firstName  // Assuming 'firstName' is present
    }));

    table.appendRows(tableData);
    doneCallback();
  })
  .catch(error => {
    console.error("Error fetching LinkedIn data: ", error);
    doneCallback();
  });
};
