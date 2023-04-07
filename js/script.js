const { createClient } = supabase;

const _supabase = createClient(config.SUPABASE_URL, config.API_KEY);
const {
  data: { session },
} = await _supabase.auth.getSession()


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
  console.log(data[0]);
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


const handle = session => {
 if(session?.user['aud'] == 'authenticated'){
  const pic = document.getElementsByClassName('profile-pic')[0]
  pic.setAttribute('src', session?.user['identities'][0]['identity_data']['avatar_url'])
  document.getElementsByClassName('login')[0].remove()
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


window.signout = signout;

async function create_carousel() {
  
  return carousel_item
}

async function set_pic() {
  //Since the id is same as the img folder number it is used as a reference to load the images
  //this object is to know how many images does each participant have
  let no_of_img = {
    '1':4,//participant with id - 1 has 4 images
    '2':3,
    '3':5,
    '4':3,
    '5':7,
    '6':3,
    '7':1
  }

  const { data, error } = await _supabase.from("participants").select().order("votes", { ascending: false });//gets the list of participants
  const img_holder = document.getElementsByClassName('carousel-inner');
  for(let i=0; i<img_holder.length; i++) {
    if(data[i].id == 8) { // For the participant who uploaded vedio
      const wrapper = document.createElement('div')
      wrapper.className = 'image-wrapper'
      const vid = document.createElement('iframe')
      vid.setAttribute('src', "https://drive.google.com/file/d/1XW59dGySE5_E0q1QzY2v2f-jmmy56daY/preview")
      vid.setAttribute('allow', 'autoplay')
      vid.className = 'vid-player'
      img_holder[i].parentElement.parentElement.insertBefore(vid, img_holder[i].parentElement.parentElement.firstChild) //gets the parent element that is the card and sets a firt child
    }
    else {
      for(let j=0; j<no_of_img[data[i].id]; j++) { //loops through all the dom elements with carousel-innr class name
        const carousel_item = document.createElement('div') //creates a carousel div
        var clasname = "carousel-item image-wrapper" //adds the class to it
        if(j == 0) { // adds the active class to only the first image in carousel
          clasname += ' active'
        }
        carousel_item.className = clasname
        const img = document.createElement('img')
        let source = 'images/' + (data[i].id).toString() + '/' + (j+1).toString() + '.jpg' //defines the path to image
        img.setAttribute('src', source)
        carousel_item.appendChild(img)
        img_holder[i].appendChild(carousel_item) //adds the dom element to the html tree
      }
    }
    }  
}

set_pic()