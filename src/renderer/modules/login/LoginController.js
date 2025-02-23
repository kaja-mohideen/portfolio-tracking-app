async function login(userName) {
    console.log("Logging in user:" + userName);
    try {
        const sessionId = await window.ElectronMain.ping.sayHelloTo(userName);
        console.log("Login successful for user: " + sessionId);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { login };