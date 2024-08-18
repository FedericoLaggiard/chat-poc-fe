import {put, takeEvery, select} from "redux-saga/effects";
import {addError, addErrors} from "./reducer";
import appErrorModel from "./model";
import {selectErrorsCount} from "./selectors";
import axios from "axios";

export default function* genericErrorSaga() {
    yield takeEvery((action) => new RegExp(/__Error/g).test(action.type), takeEveryError )
}

function* takeEveryError({payload}) {
    let count = yield select(selectErrorsCount);
    if(Array.isArray(payload)){
        const errors = [];
        payload.map( (error) => {
            errors.push(composeError(error,count));
            count ++;
        });
        yield put(addErrors(errors));
    }else{
        const err = composeError(payload, count);
        yield put(addError(err));
    }
}

function composeError(payload, errorCount) {
    if(typeof payload === "string"){
        return appErrorModel(payload, errorCount);
    }
    // if it's an object
    if(payload === Object(payload)){
        //error from API
        if(payload.hasOwnProperty("code") && payload.hasOwnProperty("description")){
            return appErrorModel(payload.description, errorCount, payload.code, payload);
        }
        //error from AXIOS
        if(axios.isAxiosError(payload)){
            const err = payload.toJSON();
            let url = "";
            if(err.config && err.config.url) url = err.config.url;
            return appErrorModel(`${url} ${err.message}`, errorCount, "", err);
        }
        //for other object try to parse it, if it fails show an empty error...
        try {
            const err = JSON.stringify(payload);
            return appErrorModel(err, errorCount);
        } catch (e) {
            return appErrorModel("",errorCount);
        }
    }

}