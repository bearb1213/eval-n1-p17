import {ApiAction} from "../util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";
import {getEnv} from "../util/EnvVariable.js";
import bcrypt  from "bcryptjs";

const xmlToJson =  new XMLParser({ignoreAttributes: false});
const apiUrl = "/employees";
const ws_key = getEnv("VITE_WS_KEY", '');


async function hashPassword(password) {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
}

async function verifyPassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    console.log("isMatch : ", isMatch);

    return isMatch;
}

async function getEmployeById(id){
    try{
        const result = await ApiAction(
            apiUrl+"/"+id ,
        "GET" ,
        );
        const json = xmlToJson.parse(result);
        const employe = json.prestashop.employee;
        return employe;

    }catch(e){
        console.log(e);
        throw e;
    }
}

async function loginAdmin(email,password){
    try{
        const result = await ApiAction(
            apiUrl ,
            "GET" ,
            {"filter[email]": email}

        );
        const value = {
            email : "",
            hashedPassword : "",
            id : "",
            isValide : false,
            isActif : false,
            nom : "",
            prenom : "",
        }
        const json = xmlToJson.parse(result);
        const employees = json.prestashop.employees;
        const empArray = Array.isArray(employees.employee) 
                        ? employees.employee.map(emp => emp["@_id"]) 
                        : employees.employee && Object.keys(employees.employee).length > 0 
                        ? [employees.employee["@_id"]] 
                        : [];
        if(empArray.length === 0){
            throw new Error("Invalid email");
        }
        for(let i=0; i<empArray.length; i++){
            const id = empArray[i];
            const emp = await getEmployeById(id);
            const hashedPassword = emp.passwd;            
            const isValid = await verifyPassword(password, hashedPassword);
            console.log("isValid : ", isValid);
            if(isValid){
                value.email = emp.email;
                value.hashedPassword = hashedPassword;
                value.id = id ;
                value.isValide = isValid;
                value.isActif = emp.active === "1" || emp.active === 1 ? true : false;
                value.nom = emp.lastname;
                value.prenom = emp.firstname;

                sessionStorage.setItem("admin", JSON.stringify(value));

                break;
            } 
        }

        if(!value.isValide){
            throw new Error("Invalid password");
        }
        return value;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

async function testLogin(){
    try {
        const admin = (sessionStorage.getItem("admin"));
        if(admin){
            const adminObj = JSON.parse(admin);
            if(adminObj.isValide && adminObj.isActif){
                return adminObj;
            }
        }else {
            return false ; 
        }
    } catch (error) {
        console.log(error);
        throw error;
        return false;
    }
}

async function logoutAdmin(){
    sessionStorage.removeItem("admin");
}

export {loginAdmin , testLogin, logoutAdmin};
