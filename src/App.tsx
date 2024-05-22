import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { CiCloudSun } from "react-icons/ci";
import fajrImg from "./assets/fajr-prayer.png";
import duherImg from "./assets/dhhr-prayer-mosque.png";
import asrImg from "./assets/asr-prayer-mosque.png";
import maghrebImg from './assets/sunset-prayer-mosque.png';
import eshaImg from "./assets/night-prayer-mosque.png"
import { Sallah } from "./@types/types";
import { AllCity } from "./@types/types";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS


const sallah: Sallah = [
  
  { id:1, name: "fajr"   , img: fajrImg   , time:"03:12" },
  { id:2, name: "duher"  , img: duherImg  , time:"12:12" },
  { id:3, name: "asr"    , img: asrImg    , time:"14:27" },
  { id:4, name: "maghreb", img: maghrebImg, time:"17:12" },
  { id:5, name: "esha"   , img: eshaImg   , time:"21:12" },
]



const arabicCapitalCities: AllCity = [ "Cairo", "Alexandria", "Giza", "Port Said", "Suez", "Luxor", "Al-Mansura", "Tanta", "Asyut", "Ismailia", "Fayyum", "Zagazig", "Aswan", "Damietta", "Hurghada", "Qena", "Sohag", "Banha", "Assiut", "Kafr El Sheikh", "Marsa Matruh"];


const App = () => {
 
  const {t, i18n }  = useTranslation()
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [settingMenu, setSetingMenu] = useState<boolean>(false);
  const [city, setCity] = useState<string>("Cairo");
  const [date, setDate] = useState<string>("")

  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });

  useEffect(() => {i18n.changeLanguage(language)},[language]) // changing the language of application

  const handleSettingMenu = () => { setSetingMenu(preve => !preve) }  // controle the setting menu apearance

  useEffect(() => { AOS.init(); }, []);

  const addDrakMode = () => { 
    document.documentElement.classList.add('dark'); // add dark mode
    setSetingMenu(false)
  } 
  
  const removeDrakMode = () => { 
    document.documentElement.classList.remove('dark'); // remove dark mode
    setSetingMenu(false)
  } 

  const handleEnLanguage = () => { // set english language
    setLanguage("en");
    setSetingMenu(false)
  }

  const handleArLanguage = () => { // set arabic language
    setLanguage("ar");
    setSetingMenu(false)
  }

  useEffect(() => { // get the salla times depending on city name
    axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`)
    .then(response => {
      setDate(response.data.data.date.gregorian.date);
      sallah[0].time = response.data.data.timings["Fajr"];
      sallah[1].time = response.data.data.timings["Dhuhr"];
      sallah[2].time = response.data.data.timings["Asr"];
      sallah[3].time = response.data.data.timings["Maghrib"];
      sallah[4].time = response.data.data.timings["Isha"];

      setTimings(response.data.data.timings)
    })
  }, [city])

  console.log(timings)
  

  return (
   <div className="app flex items-center justify-center py-[100px] lg:py-0  min-h-screen bg-primary dark:bg-black" >
     <div className="container" >
      <div className="realative bg-secondary p-10 rounded-lg text-tColor dark:bg-zinc-900 dark:text-white"  >
         
         {/* heading */}
         <div className="flex flex-row justify-between  relative  border-b-2 pb-7 border-primary dark:border-white" data-aos="fade-right" data-aos-duration="1500" >

           {/*  setting icon of app */}
           <div className="text-4xl cursor-pointer" onClick={() => handleSettingMenu()} > <IoSettingsSharp /> </div>

           {/* setting menu */}
           <div className= {settingMenu ? "shadow-lg p-4 w-44 rounded-md text-center absolute z-[9999] bg-white left-0 top-12 duration-200 dark:bg-gray-950" : "shadow-lg p-4 w-44 rounded-md text-center absolute z-40 bg-white left-[-400px] top-12"} >
                <ul>
                  <li className="flex text-2xl py-4 items-center  border-b-2 " >
                     <div className="flex-1 text-center cursor-pointer" onClick={() => addDrakMode()} > <FaRegMoon /> </div> 
                     <div className="flex-1 text-center text-4xl cursor-pointer" onClick={() => removeDrakMode()} > <CiCloudSun /> </div> 
                  </li>
                  <li className="py-2 cursor-pointer border-b-2" onClick={() => handleArLanguage()} > {t("arLng")} </li>
                  <li className="py-2 cursor-pointer" onClick={() => {handleEnLanguage()}}> {t("enLng")} </li>
                </ul>
           </div>

           {/*  timer */}
           <div>
             <div className="flex flex-row-reverse dark:flex-row gap-1 text-xl text-center justify-center mb-5" > <p> {t("timetext")}</p> <p> {t("asr")}</p>  </div>
             <div className="flex gap-2 text-4xl font-semibold justify-center items-center" > <p>00</p> <span className="font-bold block">:</span> <p>00</p> <span className="font-bold block">:</span> <p>00</p> </div>
           </div>

          {/* location  and date */}
          <div>
            <div className="text-2xl" > {date} </div>
            <div className="text-4xl text-center mt-2" > {t(city)} </div>
          </div>
         </div>

         {/* five sallah times */}
         <div className="flex items-center justify-between gap-5 mt-8 flex-wrap lg:flex-nowrap" data-aos="fade-left" data-aos-duration="1500" >
          {sallah.map(item => <div key={item.id} className="w-[200px] rounded-lg bg-bgTime text-center text-slate-400  dark:bg-zinc-800" >
            <div className="h-[100px]" ><img src={item.img} alt={item.name} className="w-full h-full rounded-tl-lg  rounded-tr-lg" /></div>
            <div className="mt-5 mb-2 text-xl" > {t(item.name)} </div>
            <div className="mb-3 text-5xl" > {item.time} </div>
          </div>)}
         </div>

         {/* Choos the city */}
         <div className="my-6 ml-auto mr-auto w-[200px]" data-aos="zoom-in" data-aos-duration="1500" >
          <select name="your_city" className="w-full text-center border-2 rounded-lg text-xl border-primary outline-none dark:bg-zinc-700" onChange={(e) => {setCity(e.target.value)}} >
            { arabicCapitalCities.map((city) => <option  value={city} key={city} selected={city === "Cairo" ? true : false} > {t(city)} </option>) }
          </select>
         </div>
        
      </div>
     </div>
   </div>
  )
}

export default App
