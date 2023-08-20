export function getUserStorage() {
    if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser !== null) {
            try {
                const user = JSON.parse(storedUser);
                return user;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export function setUserStorage(user : any) {
    console.log("teste");
    if (typeof window !== "undefined") {
        localStorage.setItem("user", user);
        return user;
    }
}