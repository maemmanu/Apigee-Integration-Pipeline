const requesttype = context.getVariable("proxy.pathsuffix");
//const code = context.getVariable("request_airport_id")

const operation_variable = "LIST";

const airportsallpattern = /\/airports$/;
const airportsidpattern = /\/airports\/[a-z]+/;

if (airportsallpattern.test(requesttype)) {
  //context.setVariable("query_variable", "code=''");
   query_variable = "code=''";
} else if (airportsidpattern.test(requesttype)) {
  const code = context.getVariable("proxy.pathsuffix").split("/")[2].toUpperCase();
  //context.setVariable("query_variable", "code='"+ code +"'");
   query_variable = "code='"+ code +"'";
} else {
  setNotFoundError();
}

const integration_input = '{"operation":"'+ operation_variable + '","filterQuery":"' + query_variable + '" }';
context.setVariable("json_input", integration_input);

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