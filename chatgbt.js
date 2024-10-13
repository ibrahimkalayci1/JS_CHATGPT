//!HTML DEN GELENLER

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");


let userText = null;

//gönderdiğimiz html ve class ismine göre bir html oluşturur

const createElement= (html, className) => {
    
    //yeni bir div oluştur
    const chatDiv = document.createElement("div")
    //oluşturduğumuz bu dive chat ve dışardan paramaetre olarak gelen class ı ver
    chatDiv.classList.add("chat", className)
    //oluşturdgmz divin içine dışardan parametre olarak gelen html parametresini ekle
    chatDiv.innerHTML = html;
    

    return chatDiv;
};



const getChatResponse = async(incomingChatDiv) => {
   const pElement = document.createElement("p");
    console.log(pElement);
//1adım url yi tanımla
    const url = "https://chatgpt-42.p.rapidapi.com/geminipro";
    // 2. adım options tanımla
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '0d3510bb57msha248fbede81a5e0p17028fjsn0730b4798126',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            messages: [
                {
                    role: 'user',
                    content: `${userText}`,
                }
            ],
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        }),
    };
    //3.adım apı ye istek at
   // fetch(url,options)
    // gelen cevabı yakala ve json a cevir
   // .then((res) => res.json())
    //json a cevrlmş veriyi yakalayıp işlemler gercekleştireblrz
   // .then((data) => console.log(data.result))
    //hata varsa yakalar
   // .catch((error) => console.error(error));

   try {
    // apı ye url ve options kullanarak istek at ve bekle
   const response = await fetch(url,options);
   //gelen cevabı json a cevir ve bekle
   const result = await response.json();
   
   //api dn geleb cevabı oluşturdgmz p etiketinin içine aktrdk
   pElement.innerHTML = result.result
    
   } catch (error) {
    console.log(error);
   }
    console.log(incomingChatDiv);
    
    // animasyonu kaldırdık
   incomingChatDiv.querySelector(".typing-animation").remove();
       // api den gelen cevabı ekrana alabilmek için chat details i secip bir değişkene aktrdk   
   const detailDiv = incomingChatDiv.querySelector(".chat-details");
   //detail içerisine olştrdgmz p etiketinin aktrdk
   detailDiv.appendChild(pElement);

   chatInput.value = null;
};

const showTypingAnimation = () => {
    const html = `
    <div class="chat-content">
                <div class="chat-details">
                    <img src="images/chatbot.jpg" alt=""/>
                    <div class="typing-animation">
                        <div class="typing-dot" style="--delay: 0.2s"></div>
                        <div class="typing-dot" style="--delay: 0.3s"></div>
                        <div class="typing-dot" style="--delay: 0.4s"></div>
                    </div>
                </div>
            </div>
    `;

    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    
getChatResponse(incomingChatDiv);

}

const handleOutGoingChat = () => {
    userText = chatInput.value.trim(); //inputun içindeki değeri la vr fazla boşlukları sil

    
    if(!userText){
        alert("Bir veri giriniz")
            return;
    }
    
const html = `
    <div class="chat-content">
        <div class="chat-details">
          <img src="images/user.jpg" alt=""/>
          <p></p>
        </div>
    </div>
`;

//kullanıcının mesajını içeren bir div oluştur ve bunu chatcontainer yapısına ekle
const outgoingChatDiv = createElement(html, "outgoing");
defaultText.remove()
outgoingChatDiv.querySelector("p").textContent = userText;
chatContainer.appendChild(outgoingChatDiv);
setTimeout(showTypingAnimation, 500) 
};



//!OLAY İZLEYİCİLERİ
sendButton.addEventListener("click", handleOutGoingChat)
//textarea içerisinde klavyede herhangi bir tusa bastgmzda bu olay izleyicisi calısır
chatInput.addEventListener("keydown", (e) => {
    //enter tuşuna basıldıgı zaman handleOutGoingChat fonksiyonu çalışır
    if(e.key === "Enter") {
        handleOutGoingChat();
    }
});

themeButton.addEventListener("click", () => {
document.body.classList.toggle("light-mode");
// body light mode içeriyrsa theme button içindeki yaıyı dark mode yap içermyrsa light mode yap
themeButton.innerText = document.body.classList.contains("light-mode")
   ? "dark_mode"
   : "light_mode";

});


deleteButton.addEventListener("click", () => {
    //confirm ile ekrana bir mesaj bastrdk
   if (confirm("Tüm sohbetleri silmek istediğinize eminmisiniz")) {
    chatContainer.remove();
   }

const defaultText = `
    <div class="default-text">
        <h1>ChatGBT Clone</h1>
    </div>
    <div class="chat-container"></div>
    <div class="typing-container">
        <div class="typing-content">
            <div class="typing-textarea">
                <textarea  id="chat-input" 
                placeholder="Aratmak istediğiniz veriyi giriniz">
                </textarea>
                <span class="material-symbols-outlined" id="send-btn">
                send</span>
            </div>
                <div class="typing-controls">
                    <span class="material-symbols-outlined" id="theme-btn">
                    light_mode</span>
                    <span class="material-symbols-outlined" id="delete-btn">
                    delete
                    </span>
                </div>
            
        </div>
    </div>
    `
   document.body.innerHTML = defaultText; 
});