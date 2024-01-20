

const date = new Date()

const year = date.getFullYear()
const month = date.getMonth() + 1 ;
const day = date.getDate()
let hours = date.getHours();
const minutes = date.getMinutes()
//convert Hours from 24 system to 12
finalHours = (hours % 12) || 12;
const minutesInhour = finalHours *  60 + minutes; 

// Print full date on screen 
document.getElementById("date").innerHTML = `${year}/${month}/${day}`

let city = document.getElementById("city")
let selectedCity = document.getElementById("city").value 

// Choose the city of prayer 
city.addEventListener("change", function() {
    onchangecity(this.value)
})


function onchangecity(selectedCity) {

    fetch(`http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${selectedCity}&country=SA&method=4&iso8601=false`)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
    }).then(prayeTime => {
    // Add The location right Now
    let location = document.querySelector(`[value = ${selectedCity}]`).innerHTML
    document.getElementById("location").innerHTML = location

    let allMonthetime = prayeTime.data;
    
    // Get Prayer Time with Hour (without Minutes) Typeof => Number
    const shuruqHIn24 = parseInt(allMonthetime[day].timings.Sunrise.slice(0,2));
    const fajrHIn24 = parseInt(allMonthetime[day].timings.Fajr.slice(0,5));
    const dhuhrHIn24 =  parseInt(allMonthetime[day].timings.Dhuhr.slice(0,5));  
    const asrHIn24 = parseInt(allMonthetime[day].timings.Asr.slice(0,5));
    const maghribHIn24 = parseInt(allMonthetime[day].timings.Maghrib.slice(0,5));
    const ishaHIn24 = parseInt(allMonthetime[day].timings.Isha.slice(0,5))

        console.log(allMonthetime[day].timings.Maghrib)
    // Get Prayer Time with Minutes (without Hours) Typeof => Number
    const shuruqM = allMonthetime[day].timings.Sunrise.slice(3,5);
    const fajrM =  allMonthetime[day].timings.Fajr.slice(3,5) ;
    const dhuhrM =  allMonthetime[day].timings.Dhuhr.slice(3,5);
    const asrM =  allMonthetime[day].timings.Asr.slice(3,5);
    const maghribM = allMonthetime[day].timings.Maghrib.slice(3,5); 
    const ishaM =  allMonthetime[day].timings.Isha.slice(3,5) ;

    
    if(hours >= ishaHIn24 || hours >= 0 && hours <= fajrHIn24 ) {
        removeClassSelected()
        document.querySelector("#fajr").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة الفجر" , fajrHIn24 , fajrM )

    }else if(hours > fajrHIn24 && hours <=  dhuhrHIn24  ) {
        removeClassSelected()
        document.querySelector("#dhuhr").parentElement.classList.add("selected")
        document.getElementById("priye-Name-now").innerHTML = "صلاة الظهر"
        document.getElementById("priye-Time-now").innerHTML = `${dhuhrHIn24  % 12 ? '12': '12'}:${dhuhrM}`

    }else if(hours >  dhuhrHIn24 && hours <= asrHIn24  ) {
        removeClassSelected()
        document.querySelector("#asr").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة العصر" , asrHIn24 , asrM )

    }else if (hours > asrHIn24 && hours <= maghribHIn24  ) {
        removeClassSelected()
        document.querySelector("#maghrib").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة المغرب" , maghribHIn24 , maghribM )
    
    }else if (hours > maghribHIn24 && hours <= ishaHIn24 ) {
        removeClassSelected()
        document.querySelector("#isha").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة العشاء " , ishaHIn24 , ishaM )
    }


    // Add all Prayers of day in  the table
    document.getElementById("shuruq").innerHTML = `${shuruqHIn24 % 12}:${shuruqM}`;
    document.getElementById("fajr").innerHTML = `${fajrHIn24 % 12}:${fajrM}`;
    document.getElementById("dhuhr").innerHTML = `${dhuhrHIn24  % 12 ? '12': '12'}:${dhuhrM}`;
    document.getElementById("asr").innerHTML = `${asrHIn24 % 12}:${asrM}`;
    document.getElementById("maghrib").innerHTML = `${maghribHIn24 % 12}:${maghribM}`;
    document.getElementById("isha").innerHTML = `${ishaHIn24 % 12}:${ishaM}`;
    
})

}


onchangecity("Madina")

// Function to remove class "Selected" from all element
function removeClassSelected() {
    let tableRow = document.querySelectorAll(".table tr");
    tableRow.forEach((e)=> {
        e.classList.remove("selected")
    })
}

// Write the prayer Time and Name Now
function prayerTimeAndName (name , hour , minute) {
    document.getElementById("priye-Name-now").innerHTML = name
    document.getElementById("priye-Time-now").innerHTML = `${hour % 12}:${minute}`
}



/* async function onchangecity(selectedCity) {

    let response = await fetch(`http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${selectedCity}&country=SA&method=4&iso8601=false`)
    let json = {}
    if(response.ok) {
        json = await response.json()
    }
    
    // Add The location right Now
    let location = document.querySelector(`[value = ${selectedCity}]`).innerHTML
    document.getElementById("location").innerHTML = location
        
    let allMonthetime = json.data;
    
    // Get Prayer Time with Hour (without Minutes) Typeof => Number
    const shuruqHIn24 = parseInt(allMonthetime[day].timings.Sunrise.slice(0,2));
    const fajrHIn24 = parseInt(allMonthetime[day].timings.Fajr.slice(0,5));
    const dhuhrHIn24 =  parseInt(allMonthetime[day].timings.Dhuhr.slice(0,5));  
    const asrHIn24 = parseInt(allMonthetime[day].timings.Asr.slice(0,5));
    const maghribHIn24 = parseInt(allMonthetime[day].timings.Maghrib.slice(0,5));
    const ishaHIn24 = parseInt(allMonthetime[day].timings.Isha.slice(0,5))

        console.log(allMonthetime[day].timings.Maghrib)
    // Get Prayer Time with Minutes (without Hours) Typeof => Number
    const shuruqM = allMonthetime[day].timings.Sunrise.slice(3,5);
    const fajrM =  allMonthetime[day].timings.Fajr.slice(3,5) ;
    const dhuhrM =  allMonthetime[day].timings.Dhuhr.slice(3,5);
    const asrM =  allMonthetime[day].timings.Asr.slice(3,5);
    const maghribM = allMonthetime[day].timings.Maghrib.slice(3,5); 
    const ishaM =  allMonthetime[day].timings.Isha.slice(3,5) ;

    
    if(hours >= ishaHIn24 || hours >= 0 && hours <= fajrHIn24 ) {
        removeClassSelected()
        document.querySelector("#fajr").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة الفجر" , fajrHIn24 , fajrM )

    }else if(hours > fajrHIn24 && hours <=  dhuhrHIn24  ) {
        removeClassSelected()
        document.querySelector("#dhuhr").parentElement.classList.add("selected")
        document.getElementById("priye-Name-now").innerHTML = "صلاة الظهر"
        document.getElementById("priye-Time-now").innerHTML = `${dhuhrHIn24  % 12 ? '12': '12'}:${dhuhrM}`

    }else if(hours >  dhuhrHIn24 && hours <= asrHIn24  ) {
        removeClassSelected()
        document.querySelector("#asr").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة العصر" , asrHIn24 , asrM )

    }else if (hours > asrHIn24 && hours <= maghribHIn24  ) {
        removeClassSelected()
        document.querySelector("#maghrib").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة المغرب" , maghribHIn24 , maghribM )
    
    }else if (hours > maghribHIn24 && hours <= ishaHIn24 ) {
        removeClassSelected()
        document.querySelector("#isha").parentElement.classList.add("selected")
        prayerTimeAndName("صلاة العشاء " , ishaHIn24 , ishaM )
    }


    // Add all Prayers of day in  the table
    document.getElementById("shuruq").innerHTML = `${shuruqHIn24 % 12}:${shuruqM}`;
    document.getElementById("fajr").innerHTML = `${fajrHIn24 % 12}:${fajrM}`;
    document.getElementById("dhuhr").innerHTML = `${dhuhrHIn24  % 12 ? '12': '12'}:${dhuhrM}`;
    document.getElementById("asr").innerHTML = `${asrHIn24 % 12}:${asrM}`;
    document.getElementById("maghrib").innerHTML = `${maghribHIn24 % 12}:${maghribM}`;
    document.getElementById("isha").innerHTML = `${ishaHIn24 % 12}:${ishaM}`;
    

} */


