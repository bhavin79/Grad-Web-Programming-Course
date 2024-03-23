import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NotFound } from "./NotFound";
import { Loading } from "./loading";
export const Payload = ()=>{
    const [data, setData] = useState([]);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{
        const getData = async()=>{
            setLoading(true);
            let data = undefined;
            try {
                const res = await axios.get(`https://api.spacexdata.com/v4/payloads/${id}`);
                data= res.data;
                console.log(data);

                setData(data);
            } catch (error) {
                setError(true);
            }
           
            setLoading(false);
            }
        getData();    
    }, [])
    if(loading){
        return <Loading/>
    }
    if(error){
        return <NotFound/>
    }
    let customerExist = false;
    let nationalitiesExist= false;
    let manufacturerExist = false;
    if(data){
         customerExist = data.customers.length>0;
         nationalitiesExist = data.nationalities.length>0;
         manufacturerExist =data.manufacturers.length>0;
    }
   
    return (
        <article>
            {data&& <div className="payloadContainer">
                <div className="payloadTitle">
                    <span>{data.name}</span>
                </div>
                <div className="payloadQuickStats">
                    <span>Type: {data.type}</span>
                    <span>Reused: {String(data.reused)}</span>
                    <span>Orbit: {data.orbit}</span>
                    <span> <Link to = {`/launches/${data.launch}`}>Launch</Link></span>
                </div>
               
                <div className="payloadNumericData">
                    <div className="payloadnumericDataHeading">
                        <span>Technical Information</span>
                        <hr></hr>
                    </div>
                    {data.mass_kg && <span>Mass (kg): {data.mass_kg}</span>}
                    {data.longitude && <span>Longitude: {data.longitude}</span>}
                    {data.semi_major_axis_km && <span>Semi-major axis (km): {data.semi_major_axis_km}</span>}
                    {data.periapsis_km && <span>Periapsis (km): {data.periapsis_km}</span>}
                    {data.apoapsis_km && <span>Apoapsis (km): {data.apoapsis_km}</span>}
                    {data.inclination_deg && <span>Inclination (degree): {data.inclination_deg}</span>}
                    {data.reference_system && <span>Reference system: {data.reference_system}</span>}
                    {data.period_min && <span>Period (min): {data.period_min}</span>}
                    {data.regime && <span>Regime: {data.regime}</span>}
                    {data.lifespan_years && <span>Lifespan (years): {data.lifespan_years}</span>}
                    {data.epoch && <span>Epoch: {data.epoch}</span>}
                    {data.raan && <span>Raan: {data.raan}</span>}
                    {data.mean_motion && <span>Mean motion: {data.mean_motion}</span>}
                    {data.mean_anomaly && <span>Mean anomaly: {data.mean_anomaly}</span>}
                </div>
                <div>
                    <hr></hr>
                </div>
                <div className="payloadGrid">
                    {customerExist && <div className="payloadGridBox1">
                            <span>
                            Customers:
                            </span>
                    </div>}
                    {customerExist && <div className="payloadGridBox2">
                            <ol>
                                {data.customers.map((cus)=>{
                                    return <li>{cus}</li>
                                })}
                            </ol>
                    </div>}
                    {customerExist && <div className="payloadGridBox3">
                        <hr></hr>
                    </div>}

                    {nationalitiesExist && <div className="payloadGridBox1">
                            <span>
                            Nationalities:
                            </span>
                    </div>}
                    {nationalitiesExist && <div className="payloadGridBox2">
                            <ol>
                                {data.nationalities.map((nat)=>{
                                    return <li>{nat}</li>
                                })}
                            </ol>
                    </div>}
                    {nationalitiesExist && <div className="payloadGridBox3">
                        <hr></hr>
                    </div>}

                    {manufacturerExist && <div className="payloadGridBox1">
                            <span>
                            Manufacturers:
                            </span>
                    </div>}
                    {manufacturerExist && <div className="payloadGridBox2">
                            <ol>
                                {data.manufacturers.map((manu)=>{
                                    return <li>{manu}</li>
                                })}
                            </ol>
                    </div>}
                    {manufacturerExist && <div className="payloadGridBox3">
                        <hr></hr>
                    </div>}
                    <div className="payloadGridBox1">
                            <span>
                            Dragon:
                            </span>
                    </div>
                    <div className="payloadGridBox2">
                            <ul>
                               <li>Capsule: {String(data.dragon.capsule)}</li>
                               <li>Mass returned (kg): {String(data.dragon.mass_returned_kg)}</li>
                               <li>Flight time (seconds): {String(data.dragon.flight_time_sec)}</li>
                               <li>Manifest: {String(data.dragon.manifest)}</li>
                               <li>Water landing:{String(data.dragon.water_landing)}</li>
                               <li>Land landing: {String(data.dragon.land_landing)}</li>
                            </ul>
                    </div>

                </div>

            </div>}   

        </article>
    )
}