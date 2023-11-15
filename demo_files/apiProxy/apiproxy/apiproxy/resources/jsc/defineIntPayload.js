var jsonMessage = {};
var query_variable = "";

const requesttype = context.getVariable("proxy.pathsuffix");

var operation_variable = "LIST";

const airportsallpattern = /\/airports$/;
const airportsidpattern = /\/airports\/[A-Z]+/;

if (airportsallpattern.test(requesttype)) {
   query_variable = "code=''";
} else if (airportsidpattern.test(requesttype)) {
  const code = context.getVariable("proxy.pathsuffix").split("/")[2].toUpperCase();
  query_variable = "code='"+ code +"'";
} else {
  setNotFoundError();
}

jsonMessage.operation = operation_variable;
jsonMessage.filterQuery = query_variable;    

context.setVariable('json_input', JSON.stringify(jsonMessage));

function setNotFoundError() {
  const errorStatus = 404;
  const errorReason = "Not Found";
  const errrorContent = {
    errror: {
      errors: [
        {
          message: errorReason,
        },
      ],
      code: errorStatus,
      message: errorReason,
    },
  };

  context.setVariable("response.status.code", errorStatus);
  context.setVariable("response.reason.phrase", errorReason);
  context.setVariable("response.header.Content-Type", "application/json");
  context.setVariable("response.content", JSON.stringify(errrorContent));
}

