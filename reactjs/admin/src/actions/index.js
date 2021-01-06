import apis from "../apis";
import { saveToken } from "../helper";
import store from "../store";

function loginAction(data) {
    // notify login action start
    store.dispatch({
        type: "LOGIN",
    });
    // call api login
    apis.login(data)
        .then((res) => {
            const { data } = res;
            if (data.success) {
                store.dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        token: data.token,
                        username: data.username,
                    },
                });
                saveToken(data.token);
                window.location = "/"; // refresh - accepted
            } else {
                store.dispatch({
                    type: "LOGIN_FAIL",
                    payload: {
                        message: data.message,
                    },
                });
            }
        })
        .catch(() => {
            store.dispatch({
                type: "LOGIN_FAIL",
                payload: {
                    message: "Something went wrong!!",
                },
            });
        });
    // new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve({
    //             token: "ey......",
    //             username: data.username,
    //             success: true,
    //         });
    //     }, 1000);
    // }).then((data) => {
    //     console.log("Call api done!");
    //     if (data.success) {
    //         store.dispatch({
    //             type: "LOGIN_SUCCESS",
    //             payload: {
    //                 token: data.token,
    //                 username: data.username,
    //             },
    //         });
    //         window.location = "/";
    //     } else {
    //         store.dispatch({
    //             type: "LOGIN_FAIL",
    //             payload: {
    //                 message: "Username or password is incorrect!",
    //             },
    //         });
    //     }
    // });
}

export { loginAction };
