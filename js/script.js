const { createClient } = supabase;

const _supabase = createClient(
  "https://chgbsifxtupobribzviz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoZ2JzaWZ4dHVwb2JyaWJ6dml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MjA3MjQsImV4cCI6MTk5MzA5NjcyNH0.NMdoTHmsyUrQsNwN8EUm5srF7NZ8O4uu0_95tsSovhk"
);

async function insert() {
  const { data, error } = await _supabase.from("participants").insert([
    { name: "aadityaa", reg_no: "21BCE1964", insta_id: "._aadi2606._" },
    { name: "jack", reg_no: "21BCE1504", insta_id: "jack@19" },
  ]);
}

async function dispData(nameList, instaList, regNoList) {
  const divs = document.getElementsByClassName("detail")
  for(var i=0; i<nameList.length; i++) {
    const name = document.createElement('p')
    const reg_no = document.createElement('p')
    const insta_id = document.createElement('p')
    const name_content = document.createTextNode("Name: " + nameList[i])
    const reg_no_content = document.createTextNode("Reg-No: " + regNoList[i])
    const insta_id_content = document.createTextNode("Insta-Id: " + instaList[i])
    name.appendChild(name_content)
    reg_no.appendChild(reg_no_content)
    insta_id.appendChild(insta_id_content)
    name.className = 'participant-name'
    reg_no.className = 'participant-reg-no'
    insta_id.className = 'insta-id'
    divs[i].appendChild(name)
    divs[i].appendChild(reg_no)
    divs[i].appendChild(insta_id)
  }
}

async function getData() {
  const { data, error } = await _supabase.from("participants").select()
  console.log(data)
  var name = []
  var insta_id = []
  var reg_no = []
  for(const ele in data) {
    name.push(data[ele]['name'])
    insta_id.push(data[ele]['insta_id'])
    reg_no.push(data[ele]['reg_no'])
  }
  dispData(name, insta_id, reg_no)
}

getData()

async function displayImage() {
  const { data } = _supabase
  .storage
  .from('pictures')
  .getPublicUrl('pics/2.jpg')
  for(const url in data) {
    console.log(data[url])
    document.getElementById("img-1").src = data[url]

  }
  // const img = document.querySelector("img");
  // img.src = data
}

displayImage()

// console.log(_supabase);

// async function downloadPic() {
//   const { data, error } = await _supabase.storage
//     .from("public/pictures")
//     .download("pics/1.jpg");
//   console.log(data);
// }

// // document.createElement(img)

// function displayImage(src, width, height) {
//   var img = document.createElement("img");
//   img.src = src;
//   img.width = width;
//   img.height = height;
//   document.body.appendChild(img);
// }

// downloadPic();
// // displayImage()

// async function getDetailsOfBucket() {
//   const { data, error } = await _supabase.storage.from("pictures").list("pics");
//   console.log(data);
// }

// getDetailsOfBucket();
