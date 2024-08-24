import dayjs from "dayjs";

const appErrorModel = (err, id, code = "", baseError = null) => {
    return {
        timestamp: dayjs(),
        baseError: baseError,
        error: err,
        code: code,
        read: false,
        id,
    };
};

export default appErrorModel;