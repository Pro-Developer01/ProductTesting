import axios from "axios";

const loginAuths = () => {
    axios
        .post("https://app.deepread.com/api/auth/demo-account")
        .then((res) => {
            console.log("Login Auth Has been Invoked", res);
            if (res.status === 200) {
                const token = res.data.authorization;
                const userId = res.data.user_id;
                localStorage.setItem("userId", userId);
                localStorage.setItem("token", token);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export default loginAuths;