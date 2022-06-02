import { ApplicationEnums } from "./../common/enums";

export let convert_usecase_error_to_http_error = (error) => {
  if (!error) {
    return null;
  }

  let retval = {
    err: null,
    status_code: 500,
  };

  switch (error.err_type) {
    case ApplicationEnums.APP.ERROR_TYPE.BAD_DATA:
      retval = {
        err: new Error(error.message),
        status_code: 400,
      };
      break;

    case ApplicationEnums.APP.ERROR_TYPE.CONFLICT:
      retval = {
        err: new Error(error.message),
        status_code: 409,
      };
      break;

    case ApplicationEnums.APP.ERROR_TYPE.DUPLICATE_RECORD:
      retval = {
        err: new Error(error.message),
        status_code: 409,
      };
      break;

    case ApplicationEnums.APP.ERROR_TYPE.RESOURCE_NOT_FOUND:
      retval = {
        err: new Error(error.message),
        status_code: 404,
      };
      break;

    case ApplicationEnums.APP.ERROR_TYPE.UNABLE_TO_PROCESS:
      retval = {
        err: new Error(error.message),
        status_code: 422,
      };
      break;

    case ApplicationEnums.APP.ERROR_TYPE.UNAUTHORIZED:
      retval = {
        err: new Error(error.message),
        status_code: 401,
      };
      break;
  }

  return retval;
};
