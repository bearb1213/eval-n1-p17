import { useState , useEffect } from "react";
import { chargeCategory , removeStock ,addStock } from "../../service/product/ProductService";


export default function PopupCategory(
    {
        handleClose
    }
){
    const [category , setCategory] = useState([]);
    const [selectedCategoryRemove , setSelectedCategoryRemove] = useState("");
    const [nb , setNb ] = useState(0);

    const [loading , setLoading ] = useState(false);
    
    const [nbRemove , setNbRemove] = useState(-1);
    const [nbTheorique , setNbTheorique] = useState(-1);
    
    const [nbToAddTheorique , setNbToAddTheorique] = useState(-1);
    const [nbAdded , setNbAdded] = useState(-1)
    
    const [selectedCategoryAdd , setSelectedCategoryAdd] = useState("");
    const [nbToAdd , setNbToAdd] = useState(0);
    const [lim , setLim ] = useState("");

    const [produitAdd ,setProduitAdd] = useState([]);
    const [produitRm ,setProduitRm] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {

            try {
                const categoryCharged = await chargeCategory();
                console.log(categoryCharged);
                setCategory(categoryCharged);
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData();
    },[])

    const handleClick = async ()=>{
        try {
            setLoading(true);
            const [addReal,addTheo,listAdd] = await addStock(selectedCategoryAdd,nbToAdd,lim);
            setNbAdded(addReal);
            setNbToAddTheorique(addTheo);
            setProduitAdd(listAdd);
            console.log("listAdd : ",listAdd);

            const [valiny , tokony,listRm] = await removeStock(selectedCategoryRemove , nb );
            setNbRemove(valiny);
            setNbTheorique(tokony);
            setProduitRm(listRm);
            console.log("list Rm : ",listRm);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button
                onClick={handleClose}
            >
                Close
            </button>
            <h2>TO Remove</h2>
            <p>{selectedCategoryRemove} au nb de  {nb}</p>
            {
                nbRemove!==-1 
                && (<div className="bg-red-500">
                    <p>
                    le nb de stock retirer = {nbRemove} , 
                    le tokony niala = {nbTheorique}
                    </p>
                    <ul>
                        {produitRm && produitRm.map((pr) => {
                        return (<li>
                            {pr.name} {pr.comb} 
                            , quantite avant {pr.before} 
                            , quantite apres {pr.after} 
                            , quantite retirer {pr.remove}
                        </li>)
                    })}
                    </ul>
                </div>)
            }
            <div>
                <label htmlFor="category">Category</label>
                <select 
                    name="" 
                    id="category" 
                    onChange={e => setSelectedCategoryRemove(e.target.value)}
                >
                    { category && category.map( (cat)  => {
                        return (

                            <option value={cat.name}>
                                {cat.name}
                            </option>
                        )
                        }
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="nb">nb</label>
                <input 
                    type="number" 
                    id="nb" 
                    min="0" 
                    value={nb} 
                    onChange={(e) => setNb(e.target.value)}
                />
            </div>

            <h2>TO Add</h2>
            
            <p>{selectedCategoryAdd} au nb de  {nbToAdd} limite {lim}</p>
            {
                nbAdded!==-1 
                && (<div className="bg-blue-500">
                    <p>
                        le nb de stock ajouter = {nbAdded} , 
                        le tokony niampy = {nbToAddTheorique}
                    </p>
                    <ul>

                    {produitAdd && produitAdd.map((pr) => {
                        return (<li>
                            {pr.name} {pr.comb} 
                            , quantite avant {pr.before} 
                            , quantite apres {pr.after} 
                            , quantite ajoute {pr.add}

                        </li>)
                    })}
                    </ul>
                
                </div>)
            }
            <div>
                <label htmlFor="category">Category</label>
                <select 
                    name="" 
                    id="category" 
                    onChange={e => setSelectedCategoryAdd(e.target.value)}
                >
                    { category && category.map( (cat)  => {
                        return (

                            <option value={cat.name}>
                                {cat.name}
                            </option>
                        )
                        }
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="nbadd">nb</label>
                <input 
                    type="number" 
                    id="nbadd" 
                    min="0" 
                    value={nbToAdd} 
                    onChange={(e) => setNbToAdd(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lim">limite</label>
                 <input 
                    type="number" 
                    id="lim" 
                    min="-1" 
                    value={lim} 
                    onChange={(e) => setLim(e.target.value)}
                />   
            </div>

            <button
                onClick={(e) => handleClick()}
            >
                {loading ? "loading..." : "valider"}
            </button>
        </div>
    )

}