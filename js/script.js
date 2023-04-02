const { createClient } = supabase;

const _supabase = createClient(config.SUPABASE_URL, config.API_KEY);
const {
  data: { session },
} = await _supabase.auth.getSession()


async function insert() {
  const { data, error } = await _supabase.from("participants").insert([
    { name: "aadityaa", reg_no: "21BCE1964", insta_id: "._aadi2606._" },
    { name: "jack", reg_no: "21BCE1504", insta_id: "jack@19" },
  ]);
}

let buttons = document.getElementsByClassName("vote-btn");

async function dispData(nameList, instaList, regNoList) {
  
  const divs = document.getElementsByClassName("detail");
  for (var i = 0; i < nameList.length; i++) {
    const name = document.createElement("p");
    const reg_no = document.createElement("p");
    const insta_id = document.createElement("p");
    const name_content = document.createTextNode(nameList[i]);
    const reg_no_content = document.createTextNode(regNoList[i]);
    const insta_id_content = document.createTextNode(instaList[i]);
    name.appendChild(name_content);
    reg_no.appendChild(reg_no_content);
    insta_id.appendChild(insta_id_content);
    name.className = "participant-name";
    reg_no.className = "participant-reg-no";
    insta_id.className = "insta-id";
    divs[i].appendChild(name);
    divs[i].appendChild(reg_no);
    divs[i].appendChild(insta_id);
    buttons[i].setAttribute("data-regno", regNoList[i]);
  }
}

const { data:data3, error3 } = await _supabase.rpc("getvote", {
  email_id: session.user.email
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let regno = buttons[i].getAttribute("data-regno");
    let vote_status = buttons[i].getAttribute("data-voted");
    if (vote_status == 0) {
      update_votes(regno);
      buttons[i].setAttribute("data-voted", 1);
      if (session?.user['aud'] == 'authenticated') {
        buttons[i].textContent = "REMOVE VOTE";
        for (let j = 0; j < buttons.length; j++) {
          if (i != j)
            buttons[j].disabled = true;
        }
      }
    } else if (vote_status == 1) {
      remove_votes(regno);
      buttons[i].setAttribute("data-voted", 0);
      buttons[i].textContent = "VOTE";
      for (let j = 0; j < buttons.length; j++) {
        if (i != j)
          buttons[j].disabled = false;
      }
    }
  });
}

async function restrictVote() {
  const regNos = document.getElementsByClassName("participant-reg-no");
  const { data:data3, error3 } = await _supabase.rpc("getvote", {
    email_id: session.user.email
  });

  for (let i = 0; i < regNos.length; i++) {
    if (regNos[i].innerHTML == data3) {
      buttons[i].textContent = "REMOVE VOTE";
      buttons[i].addEventListener("click", function () {
        let regno = buttons[i].getAttribute("data-regno");
        let vote_status = buttons[i].getAttribute("data-voted");
        
        if (vote_status == 0) {
          update_votes(regno);
          buttons[i].setAttribute("data-voted", 1);
          if (session?.user['aud'] == 'authenticated') {
            buttons[i].textContent = "REMOVE VOTE";
          }
        } else if (vote_status == 1) {
          remove_votes(regno);
          buttons[i].setAttribute("data-voted", 0);
          buttons[i].textContent = "VOTE";
        }
      });
    }
    else if (data3) {
      buttons[i].disabled=true;
    }
  }
}

async function remove_votes(reg_no) {
  if (!session) {
    alert("Sign in to vote first!");
    return;
  }
  const { data, error } = await _supabase.rpc("remove_vote", {
    quote_id: reg_no,
    increment_num: 1,
  });
  let tmp = session?.user;
  console.log(tmp.email)
  const { data2, error2 } = await _supabase.rpc("deletefromvotes", {
    user_email: tmp.email,
    regno: reg_no,
  });
  alert("Unvoted " + reg_no);
}

async function update_votes(reg_no) {
  if (!session) {
    alert("Sign in to vote first!");
    return;
  }
  const { data:data3, error3 } = await _supabase.rpc("getvote", {
    email_id: session.user.email
  });

  if (session?.user['aud'] == 'authenticated') {
    let temp = session?.user
    const { data:data4, error4 } = await _supabase.from('votes').select('email');
    let j = 0
    console.log(data4)
    for (let i in data4){
    console.log(i)
    if (data4[i].email == temp.email) {
       j = 1
    }
  }
    if (j == 0){
    const { data, error } = await _supabase.rpc("vote", {
      quote_id: reg_no,
      increment_num: 1,
    });
    alert("You voted " + reg_no);
    const { data1, error1 } = await _supabase.rpc("votetable", {
      email: temp.email,
      regno: reg_no,
    }); 
    }
    else {
      alert("You already voted");
    }

  }
}

async function getData() {
  const { data, error } = await _supabase.from("participants").select().order("votes", { ascending: false });
  console.log(data);
  var name = [];
  var insta_id = [];
  var reg_no = [];
  for (const ele in data) {
    name.push(data[ele]["name"]);
    insta_id.push(data[ele]["insta_id"]);
    reg_no.push(data[ele]["reg_no"]);
  }
  console.log(name);
  dispData(name, insta_id, reg_no);
}

getData();

async function displayImage() {
  const { data } = _supabase.storage.from("pictures").getPublicUrl("pics/2.jpg");
  for (const url in data) {
    console.log(data[url]);
    document.getElementById("img-1").src = data[url];
  }
  // const img = document.querySelector("img");
  // img.src = data
}

displayImage();

const handle = session => {
  // do whatever you want to do when auth state changes
 // For login, maybe you want to set navbar profile name
 // For logout you wanna remove it maybe, here I'll just console log
 if(session?.user['aud'] == 'authenticated'){
  const pic = document.getElementsByClassName('profile-pic')[0]
  pic.setAttribute('src', session?.user['identities'][0]['identity_data']['avatar_url'])
  document.getElementsByClassName('login')[0].remove()
  console.log(session?.user);
 }else {
  document.getElementsByClassName('profile')[0].remove()
  document.getElementsByClassName('logout')[0].remove()
 }

}

handle(session)
restrictVote();

async function signout() {
  const { error } = await _supabase.auth.signOut() 
  console.log(error)
  location.reload();
};

_supabase.auth.onAuthStateChange((_, session) => handle(session));

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

window.signout = signout;