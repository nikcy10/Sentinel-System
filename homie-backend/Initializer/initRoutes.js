import { prisma } from "./initprisma.js";
export function initRoutes(app) {
    let counter = 0;
    app.post("/createuser", async (req, res) => {
        console.log(req.body)
        try {
            const users = await prisma.user.findMany({
                where: { email: req.body.email }
            })
            if (users.length > 0) {
                return res.send(
                    "User already exists! Please login or use a different email address."
                )
            }
            const result = await prisma.user.create({
                data: req.body
            })
            if (result) {
                res.send(result)
                console.log(result)
            }
        } catch (e) {
            res.send(e)
        }
    });
    app.post("/login", async (req, res) => {
        try {
            const user = await prisma.user.findMany({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            })
            if (user.length > 0) {
                res.send(user)
            } else {
                res.send("User does not exist! Please sign up or use a different email address.")
            }
        } catch (error) {
            console.log(error)
        }
    });


    app.post("/getAllProperties", async (req, res) => {
        try {
            const result = await prisma.property.findMany({
                where: {
                    email: req.body.email
                }
            })
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send("No Properties Found")
            }
        } catch (error) {

        }

    })
    app.post("/getUserData", async (req, res) => {
        try {
            const result = await prisma.user.findMany({
                where: {
                    email: req.body.email
                }
            })
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send("No User Found")
            }
        } catch (error) {
            res.send(error)
        }
    })
    app.post("/getAllThreats", async (req, res) => {
        try {
            const result = await prisma.threats.findMany({
                where: {
                    propertyId: req.body.propertyId
                }
            })
            if (result.length > 0) {
                res.send({
                    length: result.length,
                    threats: result
                })
            } else {
                res.send("No Threats Found")
            }
        } catch (error) {

        }

    })
    app.post('/createproperty', async (req, res) => {
        try {
            const threats = await prisma.user.findMany({
                where: { email: req.body.email }
            })
            if (threats.length <= 0) {
                return res.send(
                    "User does not exist! Please sign up or use a different email address."
                )
            }
            const result = await prisma.property.create({
                data: req.body
            });
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    });
    app.post("/getproperty", async (req, res) => {
        try {
            const result = await prisma.property.findMany({
                where: {
                    id: req.body.propertyId
                }
            });
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send("Property not found")
            }
        } catch (error) {
            console.log("error")
        }
    });
    app.post("/createreport", async (req, res) => {
        try {
            const propertycheck = await prisma.property.findMany({
                where: { id: parseInt(req.body.propertyId) }
            })
            if (propertycheck.length <= 0) {
                return res.send(
                    "Property does not exist! Please create a property or use a different property id."
                )
            }
            const result = await prisma.report.create({
                data: {
                    address: propertycheck[0].address,
                    ...req.body
                }
            });
            res.send(result)
        }
        catch (error) {
            console.log(error)
        }

    })
    app.post("/getLatestReport", async (req, res) => {
        try {
            const result = await prisma.report.findMany({
                where: {
                    propertyId: req.body.propertyId
                }
            });
            if (result.length > 0) {
                res.send(result[result.length - 1])
            } else {
                res.send("Reports not found")
            }
        } catch (error) {
            console.log("error")
        }
    });
    app.post("/getallreports", async (req, res) => {
        try {
            const result = await prisma.report.findMany({
                where: {
                    propertyId: req.body.propertyId
                }
            });
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send("Reports not found")
            }
        } catch (error) {
            console.log(error)
        }
    });

    app.post("/getlatestthreat", async (req, res) => {
        console.log("Counter: ", counter)
        counter++;

        try {
            const result = await prisma.threats.findMany({
                where: {
                    propertyId: req.body.propertyId
                }
            });
            if (result.length > 0) {
                res.send(result[result.length - 1])
            } else {
                res.send("Threats not found")
            }
        } catch (error) {
            console.log(error)
        }
    });

    app.post("/createthreat", async (req, res) => {
        try {
            const result = await prisma.threats.create({
                data: req.body
            });
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    })

    app.get('/health',
        (req, res) => {
            res.send("Health is OK!")
        }
    );
    console.log("Routes initialized!")
}