const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { type } = require("express/lib/response");
const multer = require("multer");
const port = 5000;
const { ObjectId } = require("mongoose").Types;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.listen(port, () => {
    try {
        console.log(`Server is running ${port}`);
        mongoose.connect(
            "mongodb+srv://vaishakrajesh:9744252160@cluster0.rie4s.mongodb.net/db_database"
        );
        console.log("db connection established");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});

//CollectionAdmin
const CollectionAdminStructure = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    adminPassword: {
        type: String,
        required: true,
    },
    adminImg: {
        type: String,
        required: true,
    }
});
const Admin = mongoose.model("CollectionAdmin", CollectionAdminStructure)

//AdminPost

app.post("/collectionAdmin", async (req, res) => {
    try {
        const { adminName, adminEmail, adminPassword,adminImg } = req.body;
        let admin = new Admin({
            adminName,
            adminEmail,
            adminPassword,
            adminImg
            
        });
        await admin.save();
        res.json({ message: "Admin inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Admin select or find

app.get("/collectionAdmin", async (req, res) => {
    try {
        const admin = await Admin.find();
        if (admin.length === 0) {
            return res.status(404).json({ message: "admin not found" })

        } else {
            res.send(admin).status(200)
        }
    } catch (err) {
        console.error("Error Finding Admin:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//AdminFind
app.get("/collectionAdminById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admin.findById(id)
        if (admin.length === 0) {
            return res.status(404).json({ message: " Admin not found",admin:[] })
        } else {
            res.send({admin}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Admin:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//AdminDelete

app.delete("/collectionAdmin/:id", async (req, res) => {
    try {
        const adminId = req.params.id
        const deleteAdmin = await Admin.findByIdAndDelete(adminid)
        if (!deleteAdmin) {
            return res.status(404).json({ message: " Admin not found " })
        } else {
            res.json({ message: "Admin deleted successfully", deleteAdmin })
        }
    } catch (err) {
        console.error("Error deleting Admin:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//adminPut
app.put("/collectionAdmin/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { adminName, adminEmail, adminPassword,adminImg} = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { adminName, adminEmail, adminPassword,adminImg },
            { new: true }
        );
        res.json(updatedAdmin)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//adminPatch

app.patch("/collectionAdmin/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { adminName, adminEmail, adminPassword,adminImg } = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { adminName, adminEmail, adminPassword,adminImg },
            { new: true }
        );
        res.json(updatedAdmin)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})


//adminreg

const PATHA = "./public/images";
const uploadA = multer({
    storage: multer.diskStorage({
        destination: PATHA,
        filename: function (req, file, cb) {
            let origialname = file.originalname;
            let ext = origialname.split(".").pop();
            let filename = origialname.split(".").slice(0, -1).join(".");
            cb(null, filename + "." + ext);
        },
    }),
});


app.post('/collectionRegisterAdmin', uploadA.fields([{ name: "image", maxCount: 1 }]), async (req, res) => {
    console.log('hi');

    console.log('Received files:', req.files);

    const { Name, Email, Password } = req.body;


    var fileValue = JSON.parse(JSON.stringify(req.files));
    var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.image[0].filename}`;

    let admin = new Admin({
        adminName:Name, 
        adminEmail:Email, 
        adminPassword:Password,
        adminImg:profileimgsrc

    });
    await admin.save();



    // Log the data for debugging
    console.log('Processed data:', { Name,Email,Password,profileimgsrc });

    res.status(201).send({ message: 'Registration successful', data: {  Name,Email,Password,profileimgsrc  } });


});


//CollectionType
const CollectionTypeStructure = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
    }
});
const Type = mongoose.model("CollectionType", CollectionTypeStructure)

//TypePost

app.post("/collectionType", async (req, res) => {
    try {
        const { typeName } = req.body;
        let type = new Type({
            typeName
        });
        await type.save();
        res.json({ message: " Type inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Type select or find

app.get("/collectionType", async (req, res) => {
    try {
        const type = await Type.find();
        if (type.length === 0) {
            return res.send({ message: " Type not found", type: [] })
        } else {
            res.send({ type }).status(200)
        }
    } catch (err) {
        console.error("Error Finding type:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//TypeFind
app.get("/collectionTypeById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const type = await Type.findById(id)
        if (type.length === 0) {
            return res.status(404).json({ message: " Type not found" })
        } else {
            res.send(type).status(200)
        }
    } catch (err) {
        console.error("Error Finding Type:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//TypeDelete

app.delete("/collectionType/:id", async (req, res) => {
    try {
        const typeId = req.params.id
        const deleteType = await Type.findByIdAndDelete(typeId)
        if (!deleteType) {
            return res.status(404).json({ message: " Type not found " })
        } else {
            res.json({ message: "Type deleted successfully", deleteType })
        }
    } catch (err) {
        console.error("Error deleting Type:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//TypePut
app.put("/collectionType/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { typeName } = req.body;
        const updatedType = await Type.findByIdAndUpdate(
            id,
            { typeName },
            { new: true }
        );
        res.json(updatedType)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//TypePatch

app.patch("/collectionType/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { typeName } = req.body;
        const updatedType = await Type.findByIdAndUpdate(
            id,
            { typeName },
            { new: true }
        );
        res.json(updatedType)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})


//CollectionRam
const CollectionRamStructure = new mongoose.Schema({
    ramName: {
        type: String,
        required: true,
    },
    motherboardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionMotherboard",
        required: true,
    }
});
const Ram = mongoose.model("CollectionRam", CollectionRamStructure)

//RamPost

app.post("/collectionRam", async (req, res) => {
    try {
        const { ramName, motherboardId } = req.body;
        let ram = new Ram({
            ramName,
            motherboardId
        });
        await ram.save();
        res.json({ message: " Ram inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Ram select or find

app.get("/collectionRam", async (req, res) => {
    try {
        const ram = await Ram.find().populate("motherboardId");
        if (ram.length === 0) {
            return res.send.json({ message: " Ram not found", ram: [] })
        } else {
            res.send({ ram }).status(200)
        }
    } catch (err) {
        console.error("Error Finding Ram:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//RamFind
app.get("/collectionRamById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const ram = await Ram.findById(id)
        if (ram.length === 0) {
            return res.status(404).json({ message: " Ram not found" })
        } else {
            res.send(ram).status(200)
        }
    } catch (err) {
        console.error("Error Finding Ram:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//RamDelete

app.delete("/collectionRam/:id", async (req, res) => {
    try {
        const ramId = req.params.id
        const deleteRam = await Ram.findByIdAndDelete(ramId)
        if (!deleteRam) {
            return res.status(404).json({ message: " Ram not found " })
        } else {
            res.json({ message: "Ram deleted successfully", deleteRam })
        }
    } catch (err) {
        console.error("Error deleting Ram:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//RamPut
app.put("/collectionRam/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { ramName, motherboardId } = req.body;
        const updatedRam = await Ram.findByIdAndUpdate(
            id,
            { ramName, motherboardId },
            { new: true }
        );
        res.json(updatedRam)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//RamPatch

app.patch("/collectionRam/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { ramName, motherboardId } = req.body;
        const updatedRam = await Ram.findByIdAndUpdate(
            id,
            { ramName, motherboardId },
            { new: true }
        );
        res.json(updatedRam)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})


//CollectionStorage
const CollectionStorageStructure = new mongoose.Schema({
    storageName: {
        type: String,
        required: true,
    }
});
const Storage = mongoose.model("CollectionStorage", CollectionStorageStructure)

//StoragePost

app.post("/collectionStorage", async (req, res) => {
    try {
        const { storageName } = req.body;
        let storage = new Storage({
            storageName
        });
        await storage.save();
        res.json({ message: " Storage inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Storage select or find

app.get("/collectionStorage", async (req, res) => {
    try {
        const storage = await Storage.find();
        if (storage.length === 0) {
            return res.status(404).json({ message: "Storage not found" , storage: [] })

        } else {
            res.send({storage}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Storage:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//StorageFind
app.get("/collectionStorageById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const storage = await Storage.findById(id)
        if (storage.length === 0) {
            return res.send({ message: " Storage not found", storage: [] })
        } else {
            res.send({ storage }).status(200)
        }
    } catch (err) {
        console.error("Error Finding Storage:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//StorageDelete

app.delete("/collectionStorage/:id", async (req, res) => {
    try {
        const storageId = req.params.id
        const deleteStorage = await Storage.findByIdAndDelete(storageId)
        if (!deleteStorage) {
            return res.status(404).json({ message: " Storage not found " })
        } else {
            res.json({ message: "Storage deleted successfully", deleteStorage })
        }
    } catch (err) {
        console.error("Error deleting Storage:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//StoragePut
app.put("/collectionStorage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { storageName } = req.body;
        const updatedStorage = await Storage.findByIdAndUpdate(
            id,
            { storageName },
            { new: true }
        );
        res.json(updatedStorage)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//StoragePatch

app.patch("/collectionStorage/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { storageName } = req.body;
        const updatedStorage = await Storage.findByIdAndUpdate(
            id,
            { storageName },
            { new: true }
        );
        res.json(updatedType)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})


//CollectionMotherboard
const CollectionMotherboardStructure = new mongoose.Schema({
    motherboardName: {
        type: String,
        required: true,
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionType",
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionCompany",
        required: true,
    }
});
const Motherboard = mongoose.model("CollectionMotherboard", CollectionMotherboardStructure)

//MotherboardPost

app.post("/collectionMotherboard", async (req, res) => {
    try {
        const { motherboardName, typeId, companyId } = req.body;
        let motherboard = new Motherboard({
            motherboardName,
            typeId,
            companyId
        });
        await motherboard.save();
        res.json({ message: " Motherboard inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//motherboard select or find

app.get("/collectionMotherboard", async (req, res) => {
    try {
        const motherboard = await Motherboard.find().populate("typeId").populate("companyId").exec();
        if (motherboard.length === 0) {
            return res.status(404).json({ message: "Motherboard not found" ,motherboard: []})

        } else {
            res.send({motherboard}).status(200)
        }
    } catch (err) {
        console.error("Error Finding motherboard:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//motherboardFind
app.get("/collectionMotherboardById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const motherboard = await Motherboard.findById(id)
        if (motherboard.length === 0) {
            return res.status(404).json({ message: " Motherboard not found", motherboard:[] })
        } else {
            res.send({motherboard}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Type:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//motherboardDelete

app.delete("/collectionMotherboard/:id", async (req, res) => {
    try {
        const motherboardId = req.params.id
        const deleteMotherboard = await Motherboard.findByIdAndDelete(motherboardId)
        if (!deleteMotherboard) {
            return res.status(404).json({ message: " motherboard not found " })
        } else {
            res.json({ message: "Motherboard deleted successfully", deleteMotherboard })
        }
    } catch (err) {
        console.error("Error deleting motherboard:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//motherboardPut
app.put("/collectionMotherboard/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { motherboardName, typeId, companyId } = req.body;
        const updatedMotherboard = await Motherboard.findByIdAndUpdate(
            id,
            { motherboardName, typeId, companyId },
            { new: true }
        );
        res.json(updatedMotherboard)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//motherboardPatch

app.patch("/collectionMotherboard/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { motherboardName, typeId, companyId } = req.body;
        const updatedMotherboard = await Motherboard.findByIdAndUpdate(
            id,
            { motherboardName, typeId, companyId },
            { new: true }
        );
        res.json(updatedMotherboard)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//CollectionCompany
const CollectionCompanyStructure = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    }
});
const Company = mongoose.model("CollectionCompany", CollectionCompanyStructure)

//CompanyPost

app.post("/collectionCompany", async (req, res) => {
    try {
        const { companyName } = req.body;
        let company = new Company({
            companyName
        });
        await company.save();
        res.json({ message: " Company inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Company select or find

app.get("/collectionCompany", async (req, res) => {
    try {
        const company = await Company.find();
        if (company.length === 0) {
            return res.send({ message: " Company not found", company: [] })
        } else {
            res.send({ company }).status(200)
        }
    } catch (err) {
        console.error("Error Finding Company:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//CompanyFind
app.get("/collectionCompanyById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const company = await Company.findById(id)
        if (company.length === 0) {
            return res.status(404).json({ message: " Company not found" })
        } else {
            res.send(company).status(200)
        }
    } catch (err) {
        console.error("Error Finding Company:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//CompanyDelete

app.delete("/collectionCompany/:id", async (req, res) => {
    try {
        const companyId = req.params.id
        const deleteCompany = await Company.findByIdAndDelete(companyId)
        if (!deleteCompany) {
            return res.status(404).json({ message: " Company not found " })
        } else {
            res.json({ message: "Company deleted successfully", deleteCompany })
        }
    } catch (err) {
        console.error("Error deleting Company:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//CompanyPut
app.put("/collectionCompany/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { companyName } = req.body;
        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            { companyName },
            { new: true }
        );
        res.json(updatedCompany)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//CompanyPatch

app.patch("/collectionCompany/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { companyName } = req.body;
        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            { companyName },
            { new: true }
        );
        res.json(updatedCompany)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})




//CollectionGraphiccard
const CollectionGraphiccardStructure = new mongoose.Schema({
    graphiccardName: {
        type: String,
        required: true,
    }
});
const Graphiccard = mongoose.model("CollectionGraphiccard", CollectionGraphiccardStructure)

//GraphiccardPost

app.post("/collectionGraphiccard", async (req, res) => {
    try {
        const { graphiccardName } = req.body;
        let graphiccard = new Graphiccard({
            graphiccardName
        });
        await graphiccard.save();
        res.json({ message: " Graphiccard inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Graphiccard select or find

app.get("/collectionGraphiccard", async (req, res) => {
    try {
        const graphiccard = await Graphiccard.find();
        if (graphiccard.length === 0) {
            return res.status(404).json({ message: "Graphiccard not found" })

        } else {
            res.send({graphiccard}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Graphiccard:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//GraphiccardFind
app.get("/collectionGraphiccardById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const graphiccard = await Graphiccard.findById(id)
        if (graphiccard.length === 0) {
            return res.status(404).json({ message: " Graphiccard not found" })
        } else {
            res.send(graphiccard).status(200)
        }
    } catch (err) {
        console.error("Error Finding Graphiccard:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//GraphiccardDelete

app.delete("/collectionGraphiccard/:id", async (req, res) => {
    try {
        const graphiccardId = req.params.id
        const deleteGraphiccard = await Graphiccard.findByIdAndDelete(graphiccardId)
        if (!deleteGraphiccard) {
            return res.status(404).json({ message: " Graphiccard not found " })
        } else {
            res.json({ message: "Graphiccard deleted successfully", deleteGraphiccard })
        }
    } catch (err) {
        console.error("Error deleting Graphiccard:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//GraphiccardPut
app.put("/collectionGraphiccard/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { graphiccardName } = req.body;
        const updatedGraphiccard = await Graphiccard.findByIdAndUpdate(
            id,
            { graphiccardName },
            { new: true }
        );
        res.json(updatedGraphiccard)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//GraphiccardPatch

app.patch("/collectionGraphiccard/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { graphiccardName } = req.body;
        const updatedGraphiccard = await Graphiccard.findByIdAndUpdate(
            id,
            { graphiccardName },
            { new: true }
        );
        res.json(updatedGraphiccard)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})



//CollectionSmps
const CollectionSmpsStructure = new mongoose.Schema({
    smpsName: {
        type: String,
        required: true,
    },
    motherboardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionMotherboard",
        required: true,
    },
});
const Smps = mongoose.model("CollectionSmps", CollectionSmpsStructure)

//SmpsPost

app.post("/collectionSmps", async (req, res) => {
    try {
        const { smpsName, motherboardId } = req.body;
        let smps = new Smps({
            smpsName,
            motherboardId
        });
        await smps.save();
        res.json({ message: " Smps inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Smps select or find

app.get("/collectionSmps", async (req, res) => {
    try {
        const smps = await Smps.find().populate("motherboardId");
        if (smps.length === 0) {
            return res.send.json({ message: " SMPS not found", smps: [] })
        } else {
            res.send({ smps }).status(200)
        }
    } catch (err) {
        console.error("Error Finding Smps:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//SmpsFind
app.get("/collectionSmpsById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const smps = await Smps.findById(id)
        if (smps.length === 0) {
            return res.status(404).json({ message: " Smps not found" })
        } else {
            res.send(smps).status(200)
        }
    } catch (err) {
        console.error("Error Finding Smps:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//SmpsDelete

app.delete("/collectionSmps/:id", async (req, res) => {
    try {
        const smpsId = req.params.id
        const deleteSmps = await Smps.findByIdAndDelete(smpsId)
        if (!deleteSmps) {
            return res.status(404).json({ message: " Smps not found " })
        } else {
            res.json({ message: "Smps deleted successfully", deleteSmps })
        }
    } catch (err) {
        console.error("Error deleting Smps:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//SmpsPut
app.put("/collectionSmps/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { smpsName, motherboardId } = req.body;
        const updatedSmps = await Smps.findByIdAndUpdate(
            id,
            { smpsName, motherboardId },
            { new: true }
        );
        res.json(updatedSmps)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//SmpsPatch

app.patch("/collectionSmps/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { smpsName, motherboardId } = req.body;
        const updatedSmps = await Smps.findByIdAndUpdate(
            id,
            { smpsName, motherboardId },
            { new: true }
        );
        res.json(updatedSmps)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})



//CollectionCooler
const CollectionCoolerStructure = new mongoose.Schema({
    coolerName: {
        type: String,
        required: true,
    }
});
const Cooler = mongoose.model("CollectionCooler", CollectionCoolerStructure)

//CoolerPost

app.post("/collectionCooler", async (req, res) => {
    try {
        const { coolerName } = req.body;
        let cooler = new Cooler({
            coolerName
        });
        await cooler.save();
        res.json({ message: " Cooler inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Cooler select or find

app.get("/collectionCooler", async (req, res) => {
    try {
        const cooler = await Cooler.find();
        if (cooler.length === 0) {
            return res.status(404).json({ message: "Cooler not found" , cooler: [] })

        } else {
            res.send({cooler}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Cooler:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//CoolerFind
app.get("/collectionCoolerById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const cooler = await Cooler.findById(id)
        if (cooler.length === 0) {
            return res.status(404).json({ message: " Cooler not found" ,cooler:[]})
        } else {
            res.send({cooler}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Cooler:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//CoolerDelete

app.delete("/collectionCooler/:id", async (req, res) => {
    try {
        const coolerId = req.params.id
        const deleteCooler = await Cooler.findByIdAndDelete(coolerId)
        if (!deleteCooler) {
            return res.status(404).json({ message: " Cooler not found " })
        } else {
            res.json({ message: "Cooler deleted successfully", deleteCooler })
        }
    } catch (err) {
        console.error("Error deleting Cooler:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//CoolerPut
app.put("/collectionCooler/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { coolerName } = req.body;
        const updatedCooler = await Cooler.findByIdAndUpdate(
            id,
            { coolerName },
            { new: true }
        );
        res.json(updatedCooler)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//CoolerPatch

app.patch("/collectionCooler/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { coolerName } = req.body;
        const updatedCooler = await Cooler.findByIdAndUpdate(
            id,
            { coolerName },
            { new: true }
        );
        res.json(updatedCooler)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})



//CollectionCase
const CollectionCaseStructure = new mongoose.Schema({
    caseName: {
        type: String,
        required: true,
    }
});
const Case = mongoose.model("CollectionCase", CollectionCaseStructure)

//CasePost

app.post("/collectionCase", async (req, res) => {
    try {
        const { caseName } = req.body;
        let cases = new Case({
            caseName
        });
        await cases.save();
        res.json({ message: " Cases inserted successfully " })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//Case select or find
app.get("/collectionCase", async (req, res) => {
    try {
        const cases = await Case.find();
        if (cases.length === 0) {
            return res.status(404).json({ message: "Case not found", cases: [] })

        } else {
            res.send({cases}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Cases:", err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//CasesFind
app.get("/collectionCaseById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const cases = await Case.findById(id)
        if (cases.length === 0) {
            return res.status(404).json({ message: " Cases not found" , cases: []})
        } else {
            res.send({cases}).status(200)
        }
    } catch (err) {
        console.error("Error Finding Case:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//CaseDelete

app.delete("/collectionCase/:id", async (req, res) => {
    try {
        const CaseId = req.params.id
        const deleteCase = await Case.findByIdAndDelete(CaseId)
        if (!deleteCase) {
            return res.status(404).json({ message: " Case not found " })
        } else {
            res.json({ message: "Cases deleted successfully", deleteCase })
        }
    } catch (err) {
        console.error("Error deleting Cases:", err)
        res.status(500).json({ message: "internal server error" })
    }
})

//CasePut
app.put("/collectionCase/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { caseName } = req.body;
        const updatedCases = await Case.findByIdAndUpdate(
            id,
            { caseName },
            { new: true }
        );
        res.json(updatedCases)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//CasesPatch

app.patch("/collectionCase/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { caseName } = req.body;
        const updatedCases = await Case.findByIdAndUpdate(
            id,
            { caseName },
            { new: true }
        );
        res.json(updatedCases)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})


//collectionDistrict
const CollectionDistrictStructure = new mongoose.Schema({
    districtName: {
        type: String,
        required: true
    }
});
const District = mongoose.model("CollectionDistrict", CollectionDistrictStructure)

//DistrictPost

app.post("/collectionDistrict", async (req, res) => {
    try {
        const { districtName } = req.body
        let districtcheck = await District.findOne({ districtName });
        if (districtcheck) {
            return res
                .status(400)
                .json({ errors: [{ msg: "districtName already exists" }] });
        }
        let district = new District({
            districtName
        })
        await district.save();
        res.json({ message: "District inserted Successfully" })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//District select

app.get("/collectionDistrict", async (req, res) => {
    try {
        const district = await District.find();
        if (district.length === 0) {
            return res.send.json({ message: " District not found", district: [] })
        } else {
            res.send({ district }).status(200)
        }
    } catch (err) {
        console.error(" Error Finding District", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//DistrictFind

app.get("/collectionDistrictById/: id", async (req, res) => {
    try {
        const id = req.params.id
        const district = await District.findById(id)
        if (district.length === 0) {
            return res.status(404).json({ message: " District not found" })
        }
        else {
            res.send(district).status(200)
        }
    } catch (err) {
        console.error("Error Finding District: ", err)
        res.send(500).json({ message: "internal server error" })
    }
})

//DistrictDelete

app.delete("/collectionDistrict/:id", async (req, res) => {
    try {
        const districtId = req.params.id
        const deleteDistrict = await District.findByIdAndDelete(districtId)
        if (!deleteDistrict) {
            return res.status(404).json({ message: " District not found" })
        } else {
            res.json({ message: " District delete successfully", deleteDistrict })
        }
    } catch (err) {
        console.error(" Error deleting District", err)
        res.status(500).json({ message: " internal server error" })
    }
})

//DistrictPut
app.put("/collectionDistrict/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { districtName } = req.body
        const updatedDistrict = await District.findByIdAndUpdate(
            id,
            { districtName },
            { new: true }
        )
        res.json(updatedDistrict)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//DistrictPatch
app.patch("/collectionDistrict/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { districtName } = req.body
        const updatedDistrict = await District.findByIdAndUpdate(
            id,
            { districtName },
            { new: true }
        )
        res.json(updatedDistrict)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//collectionPlace

const CollectionPlaceStructure = new mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionDistrict",
        required: true
    }
});
const Place = mongoose.model("CollectionPlace", CollectionPlaceStructure)

//PlacePost
app.post("/collectionPlace", async (req, res) => {
    try {
        const { placeName, districtId } = req.body
        let place = new Place({
            placeName,
            districtId
        })
        await place.save();
        res.json({ message: " Place inserted Successfully" })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//PlaceSelect
app.get("/collectionPlace", async (req, res) => {
    try {
        const place = await Place.find().populate("districtId");
        if (place.length === 0) {
            return res.send.json({ message: " Place not found", place: [] })
        } else {
            res.send({ place }).status(200)
        }
    }
    catch (err) {
        console.error(" Error Finding Place", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//placefind

app.get("/collectionPlaceById/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({ message: "Place Not Found" });
        }

        res.status(200).json(place);
    } catch (err) {
        console.error("Error Finding Place:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.get("/collectionPlaceByIdAll/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const place = await Place.find({ districtId: id });

        if (!place) {
            return res.status(404).json({ message: "Place Not Found" });
        }

        res.status(200).json(place);
    } catch (err) {
        console.error("Error Finding Place:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//Placedelete
app.delete("/collectionPlace/:id", async (req, res) => {
    try {
        const placeId = req.params.id
        const deletePlace = await Place.findByIdAndDelete(placeId)
        if (!deletePlace) {
            return res.status(404).json({ message: " Place Not Found" })
        } else {
            res.json({ message: " Place Delete Successfully ", deletePlace })
        }
    } catch (err) {
        console.error(" Error Deleteing Place", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//Place Put
app.put("/collectionPlace/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { placeName, districtId } = req.body;
        const updatedPlace = await Place.findByIdAndUpdate(
            id,
            { placeName, districtId },
            { new: true }
        )
        res.json(updatedPlace)
    } catch (err) {
        console.error(err.message)
        res.status(500).send(" Server Error")
    }
})

//Place Patch

app.patch("/collectionPlace/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { placeName, districtId } = req.body;
        const updatedPlace = await Place.findByIdAndUpdate(
            id,
            { placeName, districtId },
            { new: true }
        )
    } catch (err) {
        console.error(err.message)
        res.status(500).send(" Server Error ")
    }
})

//collectionComplaint

const CollectionComplaintStructure = new mongoose.Schema({
    complaintTitle: {
        type: String,
        required: true
    },
    complaintContent: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    complaintReplay: {
        type: String,
        required: true
    },
    pcbuliderId: {
        type: String,
        required: true
    },
    complaintStatus: {
        type: String,
        required: true
    }
})
const Complaint = mongoose.model("CollectionComplaint", CollectionComplaintStructure)

//Compalint post
app.post("/collectionCompalint", async (req, res) => {
    try {
        const { complaintTitle, complaintContent, userId, complaintReplay, pcbuliderId, complaintStatus } = req.body
        let compalint = new Complaint({
            complaintTitle,
            complaintContent,
            userId,
            complaintReplay,
            pcbuliderId,
            complaintStatus
        })
        await compalint.save();
        res.json({ message: " Complaint Inserted Successfully " })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//compalint select or find 
app.get("/collectionCompalit", async (req, res) => {
    try {
        const compalint = await Complaint.find();
        if (compalint.length === 0) {
            return res.status(404).json({ message: " compalint Not found" })
        } else {
            res.send(compalint).status(200)
        }
    } catch (err) {
        console.error(" Error Finding Compalint: ", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//compalint Find

app.get("/collectioncompalintById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const compalint = await Compalint.findById(id)
        if (compalint.length === 0) {
            return res.status(404).json({ message: " Complaint not found " })

        } else {
            res.send(compalint).status(200)
        }
    } catch (err) {
        console.error(" Error Finding Complaint", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//compalint Delete

app.delete("/collectionComplaint/:id", async (req, res) => {
    try {
        const compalintId = req.params.id
        const deleteCompalint = await Complaint.findByIdAndDelete(compalintId)
        if (!deleteCompalint) {
            return res.status(404).json({ message: " Compalint Not Found" })
        } else {
            res.json({ message: " Compalint Deleted Successfully", deleteCompalint })
        }
    } catch (err) {
        console.error(" Error Deleteing Compalint", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//CompalintPut
app.put("/collectionComplaint/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { complaintTitle, complaintContent, userId, complaintReplay, pcbuliderId, complaintStatus } = req.body;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { complaintTitle, complaintContent, userId, complaintReplay, pcbuliderId, complaintStatus },
            { new: true }
        );
        res.json(updatedComplaint)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//ComplaintPatch

app.patch("/collectionComplaint/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { complaintTitle, complaintContent, userId, complaintReplay, pcbuliderId, complaintStatus } = req.body;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { complaintTitle, complaintContent, userId, complaintReplay, pcbuliderId, complaintStatus },
            { new: true }
        );
        res.json(updatedComplaint)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//CollectionFeedBack

const CollectionFeedBackStructure = new mongoose.Schema({
    FeedbackRecation: {
        type: String,
        required: true
    },
    FeedbackContent: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionUser",
        required: true
    },
    // pcbuliddevId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "CollectionPcbuliddev",
    //     required: true
    // },

})

const Feedback = mongoose.model("CollectionFeedBack", CollectionFeedBackStructure)

//feedback Post
app.post("/collectionFeedBack", async (req, res) => {
    try {
        const { FeedbackRecation, FeedbackContent, userId } = req.body
        let feedback = new Feedback({
            FeedbackRecation,
            FeedbackContent,
            userId,
            
        })
        await feedback.save();
        res.json({ message: " FeedBack Inserted Successfully " })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//feedback select or find
app.get("/collectionFeedBack", async (req, res) => {
    try {
        const feedback = await Feedback.find()
        if (feedback.length === 0) {
            return res.status(404).json({ message: " FeedBack Not Found " , feedback:[]})
        } else {
            res.send({feedback}).status(200)
        }
    } catch (err) {
        console.error(" Error Finding FeedBack ", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//feedback Find

app.get("/collectionFeedBackById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const feedback = await Feedback.findById(id)
        if (feedback.length === 0) {
            return res.status(404).json({ message: " Feedback not Found", feedback:[] })
        } else {
            res.send({feedback}).status(200)
        }
    } catch (err) {
        console.error(" Error Finding Feedback", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//feedback delete
app.delete("/collectionFeedBack/:id", async (req, res) => {
    try {
        const feedbackId = req.params.id
        const deletefeedback = await Feedback.findByIdAndDelete(feedbackId)
        if (!deletefeedback) {
            return res.status(404).json({ message: " feedback Not Found" })
        } else {
            res.json({ message: " Feedback Deleted Successfully", deletefeedback })
        }
    } catch (err) {
        console.error(" Error Deleteing Feedback", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//FeedbackPut
app.put("/collectionFeedback/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { FeedbackRecation, FeedbackContent, userId } = req.body;
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { FeedbackRecation, FeedbackContent, userId, pcbuliddevId },
            { new: true }
        );
        res.json(updatedFeedback)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//feedbackPatch

app.patch("/collectionFeedback/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { FeedbackRecation, FeedbackContent, userId } = req.body;
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { FeedbackRecation, FeedbackContent, userId },
            { new: true }
        );
        res.json(updatedFeedback)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})
//CollectionCPU

const CollectionCpuStructure = new mongoose.Schema({
    cpuName: {
        type: String,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionCompany",
        required: true
    },
    // cpuImg: {
    //     type: String,
    //     required: true
    // },
    // cpuDetails: {
    //     type: String,
    //     required: true
    // },

})

const Cpu = mongoose.model("CollectionCpu", CollectionCpuStructure)

//Cpu Post
app.post("/collectionCpu", async (req, res) => {
    try {
        const { cpuName, companyId } = req.body
        let cpu = new Cpu({
            cpuName, 
            companyId, 
            // cpuImg, 
            // cpuDetails
        })
        await cpu.save();
        res.json({ message: " CPU Inserted Successfully " })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//CPU select or find
app.get("/collectionCpu", async (req, res) => {
    try {
        const cpu = await Cpu.find()
        if (cpu.length === 0) {
            return res.status(404).json({ message: " CPU Not Found ", cpu: [] })
        } else {
            res.send({cpu}).status(200)
        }
    } catch (err) {
        console.error(" Error Finding cpu ", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//CPU Find

app.get("/collectionCpuById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const cpu = await Cpu.findById(id)
        if (cpu.length === 0) {
            return res.status(404).json({ message: " CPU not Found" , cpu: []})
        } else {
            res.send({cpu}).status(200)
        }
    } catch (err) {
        console.error(" Error Finding CPU", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//CPU delete
app.delete("/collectionCpu/:id", async (req, res) => {
    try {
        const cpuId = req.params.id
        const deletecpu = await Feedback.findByIdAndDelete(cpuId)
        if (!deletecpu) {
            return res.status(404).json({ message: " CPU Not Found" })
        } else {
            res.json({ message: " CPU Deleted Successfully", deletecpu })
        }
    } catch (err) {
        console.error(" Error Deleteing CPU", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//CPUPut
app.put("/collectionCpu/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { cpuName, companyId, cpuImg, cpuDetails } = req.body;
        const updatedCpu = await Cpu.findByIdAndUpdate(
            id,
            { cpuName, companyId },
            { new: true }
        );
        res.json(updatedCpu)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//feedbackPatch

app.patch("/collectionCpu/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { cpuName, companyId} = req.body;
        const updatedCpu = await Cpu.findByIdAndUpdate(
            id,
            { cpuName, companyId },
            { new: true }
        );
        res.json(updatedCpu)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//collection user
const CollectionUserStructure = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    userPhoto: {
        type: String,
        required: true
    },
    userProof: {
        type: String,
        required: true
    },
    userContact: {
        type: String,
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionPlace",
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
})

const User = mongoose.model("CollectionUser", CollectionUserStructure)

//UserPost
app.post("/collectionUser", async (req, res) => {
    try {
        const { userName, userEmail, userAddress, userPhoto, userProof, userContact, placeId, userPassword } = req.body
        let user = new User({
            userName,
            userEmail,
            userAddress,
            userPhoto,
            userProof,
            userContact,
            placeId,
            userPassword
        })
        await user.save();
        res.json({ message: " User Inserted Successfully " })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//user select or find 
app.get("/collectionUser", async (req, res) => {
    try {
        const user = await User.find()
        if (user.length === 0) {
            return res.status(404).json({ message: " User Not Found", user: []})
        } else {
            res.send({user}).status(200)
        }
    } catch (err) {
        console.error(" Error Finding User ", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//user find
app.get("/collectionUserById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (user.length === 0) {
            return res.status(404).json({ message: " user not Found" ,user: []})
        } else {
            res.send({user}).status(200)
        }
    } catch (err) {
        console.error(" Error Finding User", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//user delete
app.delete("/collectionUser/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const deleteuser = await User.findByIdAndDelete(userId)
        if (!deleteuser) {
            return res.status(404).json({ message: " User Not Found" })
        } else {
            res.json({ message: " User Deleted Successfully", deleteuser })
        }
    } catch (err) {
        console.error(" Error Deleteing user", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//UserPut
app.put("/collectionUser/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { userName, userEmail, userAddress, userPhoto, userProof, userContact, placeId, userPassword } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userName, userEmail, userAddress, userPhoto, userProof, userContact, placeId, userPassword },
            { new: true }
        );
        res.json(updatedUser)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//UserPatch

app.patch("/collectionUser/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { userName, userEmail, userAddress, userPhoto, userProof, userContact, placeId, userPassword } = req.body;
        const updateduser = await User.findByIdAndUpdate(
            id,
            { userName, userEmail, userAddress, userPhoto, userProof, userContact, placeId, userPassword },
            { new: true }
        );
        res.json(updateduser)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//userreg

const PATH = "./public/images";
const upload = multer({
    storage: multer.diskStorage({
        destination: PATH,
        filename: function (req, file, cb) {
            let origialname = file.originalname;
            let ext = origialname.split(".").pop();
            let filename = origialname.split(".").slice(0, -1).join(".");
            cb(null, filename + "." + ext);
        },
    }),
});


app.post('/collectionUserreg', upload.fields([{ name: "image", maxCount: 1 },
{ name: "proof", maxCount: 1 }]), async (req, res) => {
    console.log('hi');

    console.log('Received files:', req.files);

    const { name, email, address, contact, place, password } = req.body;


    var fileValue = JSON.parse(JSON.stringify(req.files));
    var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.image[0].filename}`;
    var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;

    let user = new User({
        userName: name,
        userEmail: email,
        userAddress: address,
        userContact: contact,
        placeId: place,
        userPassword: password,
        userPhoto: profileimgsrc,
        userProof: proofimgsrc

    });
    await user.save();



    // Log the data for debugging
    console.log('Processed data:', { name, email, address, contact, place, profileimgsrc, proofimgsrc });

    res.status(201).send({ message: 'Registration successful', data: { name, email, address, contact, place, password, proofimgsrc, profileimgsrc } });


});
  

//collection custom
const CollectionCustomStructure = new mongoose.Schema({
    motherboardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionMotherboard",
        required: true
    },
    storageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionStorage",
        required: true
    },
    ramId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionRam",
        required: true
    },
    graphiccardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionGraphiccard",
        required: true
    },
    coolerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionCooler",
        required: true
    },
    CaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionCase",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionUser",
    },
    customStatus: {
        type: String,
    },
    pcBuliderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionPcBulider",
        required: true
    }
})

const Custom = mongoose.model("CollectionCustom", CollectionCustomStructure)

//Custom Post
app.post("/collectioncustom", async (req, res) => {
    try {
        const { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcBuliderId } = req.body
        let custom = new Custom({
            motherboardId,
            storageId,
            ramId,
            companyId,
            graphiccardId,
            coolerId,
            CaseId,
            userId,
            customStatus,
            pcBuliderId
        })
        await custom.save();
        res.json({ message: " Custom Inserted Successfully " })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//Custom select or find 
app.get("/collectionCustom", async (req, res) => {
    try {
        const custom = await Custom.find().populate("motherboardId").populate("storageId").populate("ramId").populate("graphiccardId").populate("coolerId").populate("CaseId").populate("userId").exec()
        if (custom.length === 0) {
            return res.status(404).json({ message: " Custom Not Found" })
        } else {
            res.send(custom).status(200)
        }
    } catch (err) {
        console.error(" Error Finding Custom ", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//custom find
app.get("/collectionCustomById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const custom = await Custom.findById(id)
        if (custom.length === 0) {
            return res.status(404).json({ message: " Custom not Found" })
        } else {
            res.send(custom).status(200)
        }
    } catch (err) {
        console.error(" Error Finding Custom", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
})




app.get("/collectionCustomByBuilder/:id", async (req, res) => {
    try {
        const builderId = req.params.id;
        const customBuilds = await Custom.find({ pcBuliderId: builderId }).populate("motherboardId").populate("storageId").populate("ramId").populate("graphiccardId").populate("coolerId").populate("CaseId").populate("userId");
        
        if (customBuilds.length === 0) {
            return res.status(404).json({ message: "No custom builds found for this builder" });
        }
        
        res.status(200).json(customBuilds);
    } catch (err) {
        console.error("Error Finding Custom Builds:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get("/collectionCustomByUser/:id", async (req, res) => {
    try {
        const UserId = req.params.id;
        const customBuilds = await Custom.find({ userId: UserId }).populate("motherboardId").populate("storageId").populate("ramId").populate("graphiccardId").populate("coolerId").populate("CaseId").populate("userId");
        
        if (customBuilds.length === 0) {
            return res.status(404).json({ message: "No custom builds found for this builder" });
        }
        
        res.status(200).json(customBuilds);
    } catch (err) {
        console.error("Error Finding Custom Builds:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//Custom delete
app.delete("/collectionCustom/:id", async (req, res) => {
    try {
        const customId = req.params.id
        const deleteCustom = await Custom.findByIdAndDelete(customId)
        if (!deleteCustom) {
            return res.status(404).json({ message: " Custom Not Found" })
        } else {
            res.json({ message: " Custom Deleted Successfully", deleteCustom })
        }
    } catch (err) {
        console.error(" Error Deleteing Custom", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//CustomPut
app.put("/collectionCustom/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId } = req.body;
        const updatedCustom = await Custom.findByIdAndUpdate(
            id,
            { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId },
            { new: true }
        );
        res.json(updatedCustom)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//CustomPatch

app.patch("/collectionCustom/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId } = req.body;
        const updatedCustom = await Custom.findByIdAndUpdate(
            id,
            { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId },
            { new: true }
        );
        res.json(updatedCustom)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//collection PreBulid
const CollectionPreBulidStructure = new mongoose.Schema({
    motherboardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionMotherboard",
        required: true
    },
    storageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionStorage",
        required: true
    },
    ramId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionRam",
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionCompany",
        required: true
    },
    graphiccardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionGraphiccard",
        required: true
    },
    coolerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionCooler",
        required: true
    },
    CaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionCases",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionUser",
        required: true
    },
    customStatus: {
        type: String,
        required: true
    },
    pcbuliddevId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collectionpcbuliddev",
        required: true
    }
})

const PreBulid = mongoose.model("CollectionPreBulid", CollectionPreBulidStructure)

//PreBulid Post
app.get("/collectionPreBulid", async (req, res) => {
    try {
        const { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId } = req.body
        let preBulid = new PreBulid({
            motherboardId,
            storageId,
            ramId,
            companyId,
            graphiccardId,
            coolerId,
            CaseId,
            userId,
            customStatus,
            pcbuliddevId
        })
        await preBulid.save();
        res.json({ message: " PreBulid Inserted Successfully " })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//PreBulid select or find 
app.get("/collectionPreBulid", async (req, res) => {
    try {
        const preBulid = await PreBulid.find()
        if (preBulid.length === 0) {
            return res.status(404).json({ message: " PreBulid Not Found" })
        } else {
            res.send(preBulid).status(200)
        }
    } catch (err) {
        console.error(" Error Finding PreBulid ", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//PreBulid find
app.get("/collectionPreBulidById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const preBulid = await PreBulid.findById(id)
        if (preBulid.length === 0) {
            return res.status(404).json({ message: " PreBulid not Found" })
        } else {
            res.send(preBulid).status(200)
        }
    } catch (err) {
        console.error(" Error Finding PreBulid", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//PreBulid delete
app.delete("/collectionPreBulid/:id", async (req, res) => {
    try {
        const preBulidId = req.params.id
        const deletePreBulid = await PreBulid.findByIdAndDelete(preBulidId)
        if (!deletePreBulid) {
            return res.status(404).json({ message: " PreBulid Not Found" })
        } else {
            res.json({ message: " PreBulid Deleted Successfully", deletePreBulid })
        }
    } catch (err) {
        console.error(" Error Deleteing PreBulid", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//PreBulidPut
app.put("/collectionPreBulid/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId } = req.body;
        const updatedPreBulid = await PreBulid.findByIdAndUpdate(
            id,
            { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId },
            { new: true }
        );
        res.json(updatedPreBulid)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//PreBulidPatch

app.patch("/collectionPreBulid/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId } = req.body;
        const updatedPreBulid = await PreBulid.findByIdAndUpdate(
            id,
            { motherboardId, storageId, ramId, companyId, graphiccardId, coolerId, CaseId, userId, customStatus, pcbuliddevId },
            { new: true }
        );
        res.json(updatedPreBulid)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//collection PcBulider
const CollectionPcBuliderStructure = new mongoose.Schema({
    pcBuliderName: {
        type: String,
        required: true
    },
    pcBuliderEmail: {
        type: String,
        required: true
    },
    pcBuliderAddress: {
        type: String,
        required: true
    },
    pcBuliderContact: {
        type: String,
        required: true
    },
    pcBuliderProof: {
        type: String,
        required: true
    },
    pcBuliderPhoto: {
        type: String,
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollectionPlace",
        required: true
    },
    pcBuliderPassword: {
        type: String,
        required: true
    }
})

const PcBulider = mongoose.model("CollectionPcBulider", CollectionPcBuliderStructure)

//PcBulider Post
app.post("/collectionPcBulider", async (req, res) => {
    try {
        const { pcBuliderName, pcBuliderEmail, pcBuliderAddress, pcBuliderContact, pcBuliderProof, pcBuliderPhoto ,placeId , pcBuliderPassword } = req.body
        let pcBulider = new PcBulider({
            pcBuliderName,
            pcBuliderEmail,
            pcBuliderAddress,
            pcBuliderProof,
            pcBuliderPhoto,
            pcBuliderContact,
            placeId,
            pcBuliderPassword

        })
        await pcBulider.save();
        res.json({ message: " PcBulider Inserted Successfully " })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

//PcBulider select or find 
app.get("/collectionPcBulider", async (req, res) => {
    try {
        const pcBulider = await PcBulider.find()
        if (pcBulider.length === 0) {
            return res.status(404).json({ message: " PcBulider Not Found" })
        } else {
            res.send(pcBulider).status(200)
        }
    } catch (err) {
        console.error(" Error Finding PcBulider ", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//pcBulider find
app.get("/collectionPcBuliderById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const pcBulider = await PcBulider.findById(id)
        if (pcBulider.length === 0) {
            return res.status(404).json({ message: " PcBulider not Found",pcBulider:[] })
        } else {
            res.send({pcBulider}).status(200)
        }
    } catch (err) {
        console.error(" Error Finding PcBulider", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

app.get("/collectionPcBuliderByIdAll/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        // Find PC builders by placeId
        const pcBulider = await PcBulider.find({ placeId: id });

        // Check if the result is an empty array
        if (pcBulider.length === 0) {
            return res.status(404).json({ message: "No PC Builders Found for the Given Place ID" });
        }

        // Return the found PC builders
        res.status(200).json({pcBulider});
    } catch (err) {
        console.error("Error Finding PC Builders:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//pcBulider delete
app.delete("/collectionPcBulider/:id", async (req, res) => {
    try {
        const pcBuliderId = req.params.id
        const deletePcBulider = await PcBulider.findByIdAndDelete(pcBuliderId)
        if (!deletePcBulider) {
            return res.status(404).json({ message: " PcBulider Not Found" })
        } else {
            res.json({ message: " PcBulider Deleted Successfully", deletePcBulider })
        }
    } catch (err) {
        console.error(" Error Deleteing PcBulider ", err)
        res.status(500).json({ message: " Internal Server Error" })
    }
})

//PcBulider Put
app.put("/collectionPcBuliderid/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { pcBuliderName, pcBuliderEmail, pcBuliderAddress, pcBuliderContact, pcBuliderProof, pcBuliderPhoto ,placeId , pcBuliderPassword } = req.body;
        const updatedpcBulider = await PcBulider.findByIdAndUpdate(
            id,
            { pcBuliderName, pcBuliderEmail, pcBuliderAddress, pcBuliderContact, pcBuliderProof, pcBuliderPhoto ,placeId , pcBuliderPassword },
            { new: true }
        );
        res.json(updatedpcBulider)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//PcBuliderPatch

app.patch("/collectionPcBulider/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { pcBuliderName, pcBuliderEmail, pcBuliderAddress, pcBuliderContact, pcBuliderProof, pcBuliderPhoto ,placeId , pcBuliderPassword } = req.body;
        const updatedPcBulider = await PcBulider.findByIdAndUpdate(
            id,
            { pcBuliderName, pcBuliderEmail, pcBuliderAddress, pcBuliderContact, pcBuliderProof, pcBuliderPhoto ,placeId , pcBuliderPassword },
            { new: true }
        );
        res.json(updatedPcBulider)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

//pcBuliderreg

app.post('/collectionBuliderreg', upload.fields([{ name: "image", maxCount: 1 },
    { name: "proof", maxCount: 1 }]), async (req, res) => {
        console.log('hi');
    
        console.log('Received files:', req.files);
    
        const { name, email, address, contact, place, password } = req.body;
    
    
        var fileValue = JSON.parse(JSON.stringify(req.files));
        var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.image[0].filename}`;
        var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;
    
        let pcBulider = new PcBulider({
            pcBuliderName: name,
            pcBuliderEmail: email,
            pcBuliderAddress: address,
            pcBuliderContact: contact,
            placeId: place,
            pcBuliderPassword: password,
            pcBuliderPhoto: profileimgsrc,
            pcBuliderProof: proofimgsrc
    
        });
        await pcBulider.save();
    
    
    
        // Log the data for debugging
        console.log('Processed data:', { name, email, address, contact, place, profileimgsrc, proofimgsrc });
    
        res.status(201).send({ message: 'Registration successful', data: { name, email, address, contact, place, password, proofimgsrc, profileimgsrc } });
    
    
    });

    //login
app.post("/Login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        userEmail: email,
        userPassword: password,
      });
      const pcBulider = await PcBulider.findOne({
        pcBuliderEmail: email,
        pcBuliderPassword: password,
      });
      const admin = await Admin.findOne({
        adminEmail: email,
        adminPassword: password,
      });
  
  
      if (user) {
        res.send({
          id: user._id,
          login: "user",
        });
      }
      else if(admin)
        {
            res.send({
              id: admin._id,
              login: "admin",
            });
          }
      else if(pcBulider)
        {
            res.send({
              id: pcBulider._id,
              login: "pcBulider",
            });
          }

      if (!user && !pcBulider && !admin) {
        res.send({
          login: "error",
        });
      }
    } catch (err) {
      console.error("Error", err);
    }
  });