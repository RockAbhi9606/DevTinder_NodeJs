const adminAuth = (req, res, next) => {
    console.log("Admin Auth checked...!")
    const token = "xyz";
    const isAdminAuthrized = token === "xyz";
    if (!isAdminAuthrized) {
        res.status(401).send("unautharized")
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User Auth checked...!")
    const token = "xyz";
    const isAdminAuthrized = token === "xyz";
    if (!isAdminAuthrized) {
        res.status(401).send("unautharized")
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}