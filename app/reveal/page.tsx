"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getCompletedPuzzles } from "../lib/progress";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RevealPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [bgElements, setBgElements] = useState<
    Array<{
      id: number;
      emoji: string;
      left: string;
      top: string;
      size: string;
      duration: number;
      delay: number;
    }>
  >([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const imageFilenames = [
    "Image1.png",
    "Image2.png",
    "Image3.png",
    "Image4.png",
    "Image5.jpg",
    "Image6.jpg",
    "Image7.jpg",
    "Image8.jpg",
    "Image9.jpg",
    "Image10.jpg",
    "Image11.jpg",
    "Image12.jpg",
    "Image13.jpg",
    "Image14.jpg",
    "Image15.jpg",
    "Image16.jpg",
    "Image17.jpg",
    "Image18.jpg",
    "Image19.jpg",
    "Image20.jpg",
    "Image21.jpg",
  ];

  // Generate romantic background elements
  useEffect(() => {
    const emojis = [
      // Hearts
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💕",
      "💞", "💓", "💗", "💖", "💘", "💝", "💟", "❣️", "💔", "❤️‍🔥",
      // Roses & flowers
      "🌹", "🥀", "🌷", "🌸", "🌺", "🌼", "🌻", "🏵️", "💮", "🌿",
      // Sparkles
      "✨", "🌟", "⭐", "💫",
    ];

    const elements = [];
    for (let i = 0; i < 40; i++) {
      elements.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}rem`,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
      });
    }
    setBgElements(elements);
  }, []);

  // Preload images and check access
  useEffect(() => {
    const completed = getCompletedPuzzles();
    if (!completed.includes(9)) {
      router.push("/puzzles/9");
      return;
    }

    const loadedImages = imageFilenames.map(
      (name) => `/reveal/${name}`
    );
    setImages(loadedImages);
  }, [router]);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/reveal/music.mp3"); 
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <main className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Loading memories...</div>
          <div className="w-16 h-16 border-4 border-t-white border-gray-600 rounded-full animate-spin mx-auto" />
        </div>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen text-white py-12 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #8b0000 0%, #4a0404 70%, #1a0000 100%)",
      }}
    >
      {/* Floating romantic elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {bgElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute"
            style={{
              left: el.left,
              top: el.top,
              fontSize: el.size,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title with heartbeat animation */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 20px #8b0000, 0 0 40px #4a0404",
              "0 0 30px #8b0000, 0 0 60px #4a0404",
              "0 0 20px #8b0000, 0 0 40px #4a0404",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-5xl md:text-7xl font-bold text-center mb-8"
          style={{
            color: "#f28e8e",
            textShadow: "0 0 20px #8b0000, 0 0 40px #4a0404",
          }}
        >
          Happy 1 Year Anniversary, Love! ❤️
        </motion.h1>

        {/* Big Note with romantic styling */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-500/50 shadow-2xl"
          style={{
            boxShadow:
              "0 0 60px rgba(139, 0, 0, 0.3), inset 0 0 30px rgba(139, 0, 0, 0.2)",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-pink-300">
            Dil se Dil Tak
          </h2>
          <div
            className={`${cormorant.className} text-2xl md:text-3xl text-gray-100 leading-relaxed text-center whitespace-pre-line`}
            style={{ textShadow: "0 0 10px #8b0000" }}
          >
            {`Aoa, Hamna Salik kesi ho? kesa gaya sab?, theek se ho gaya tha ke nahi? Shooting kar li thi tum ne? Shalimar baagh gaye thay hum? Umeed hai sab achay se ho gaya ho ga ye main 2 maheenay pehlay likh raha hun aj tareekh hai 4 February 2026, araayy wah 2026 achuka hai humain aik saal honay ko hai, abhi time ho raha hai 5:09 same format jo humari dairy ke chapter 2 main beghum ne choose kiya tha time wala, tabhi jab beghum ne meri saalgirah ke liye plans banai thay, cake toh behtreen tha na jee, cutting ap ke saath kar ke toh woh our bhi beautiful ho gaya tha ♥️, pata hai actually main maine tumhari di hui hi shirt pehni hai, our abhi call pe baataya bhi hai tumhe🤣, khair ye mera writing format(time based) nahi toh I'll change the tone, wapsi, ahm ahm.
Hamna Salik(Beghum) pata hai yahan ki Icecream abhi tak tumhara wait kar rahi hai melt honay ko hai, khani nahi hai kya? Tumhe pata hai, obviously pata hai humari anniversary hai aj "toh wohi na", Aik Saal ho chuka hai tumhe apna banai, tumhe jaatay jaantay, har subha tum se good morning suna hai our raat ko good night, khayal rakhain apna, khana kha lena our haan ye ap ka mian jee, khoob se hugs liye hain our diye bhi, bohat si cheezain hain jin ki eye snap li hain maine.
par main shuru sach se karun ga khikhi pata hai ye kafi aik long note honay wala hai thaak na jana pharte pharte okay, main yahan pe complete honesty rakhu ga don't worry sugar coated ho ga, shyd aisa kuch ho bhi na jo tum soch rahi ho, baatanay ka maqsaad ye ke defensive nahi hona, everything I write comes from a place of love, my heart ❤️ (jo ab apka hai, girana nahi hai😂 catch) also jhoot kafi artificial our banawati hota hai piyara toh lagta hai par heart to heart nahi hota haina, meri sachi muchi wali beghum, main jab ye likh raha hun mujhe kafi baatain at the top of my head arahi hain jo include karni hain🤣, iss note main shayad ap ko kamiyan milain meri writing main, shyd ap ka standard of Hamna Salik na ho, shyd kuch baatain yan spelling mistakes bhi hoon par matter only sach karta hai(karwa nahi hai😂), and the sach is "I Love You" and Will Love you till we reunite, here and in Jannah, Jannah wala part hooroon ki wajha se nahi dala theek hai 😂😂, I Love You and I think I have proved it to you through my actions over the year to best of my ability, and will continue to do so, With You I never tried, I always did, haan suprise denay ki koshish hi ki hai😂, pata nahi kiun par aik moment bar bar surface kar raha hai tumhe yaad hai jab main tumhe lenay aya tha and hum movie dekhnay ja rahay thay beghum ko pata bhi nahi tha, beghum ko maine uss din necklace pehnaya tha, woh niqaab pehan rahi thi our main mashallah keh raha tha baar baar kafi acha guzra tha woh din, hand pe kafi kisses bhi diye thay ♥️🫂 Rikshaw main.
Toh baat hai 2020 ki corona ka time tha, Hamna Salik mujhe contact karti hain, our humari baat hoti hai, pata hai what I loved about you and I still do, ap direct ho jo cheez nahi pasand bol di, haan ye zaroor pata chala hai ke samjhnay pe samjh zaroor jati hai meri bandi, maine aik baat tumhe nahi baatai thi, pata hai, I was going through a hard phase, pata nahi kiun par aik feeling ai thi very strong tumhe le kar, socha tha jaoun ga Lahore rahoon ga, Deen seekhun ga our kaheen na kaheen tumhe bhi dekh loun ga, par kuch safar insaan ko khud tay karnay hotay hain, kuch cheezain khud seekhni hoti hain, par remember I'm always here for you, my reflection, My Heart I'm here with you, for you, my other half, khair aik our Intresting baat hai par woh kisi our waqt, tumhe yaad hai jab main call katnay laga tha and you asked me kon sa color pasand hai, meet reh gaya tha humara dress selection main, kafi baatain hain I'd love to tell you while holding your hand, par abhi waqt hai iss intezaar ko, kafi arsay baad ai hai shaam e ghaam, ye ristha jo humara hai It's very dear to my heart, ye ristha Allah ki taraf se likha hua tha, ye likha gaya hai takay hum aik dusre ki growth or support banain, Allah ki taraf sahi se guided hoon, har moor par ye rishta sacrifice or effort mangta hai, har roz beghum ka uth ke message karna good morning, jhat se call karna, aik saath cheezain manage karna, I really do appreciate it, par har effort is returned in one way or another, beghum kehti hain balance hona chaiye one sided nahi kehti ho na ye baat 😂 iss main balance dhoondna our maintain karna is very important, pata hai main jab bhi kuch bhejwata hun ya beghum ko deta hun and Hamna Salik kahti hai "iss ki kya zaroorat thi" it's not for you it's for us. I remember the first time jab meri beghum ne meray liye shashuka banaya tha nashtay main, main abhi utha nahi tha, Talha ne kaha kuch ban raha hai teray liye, and I was like wow for me? Her face turned red jab maine kaha dil se ban raha hai, har subha meray se pehle uth jati thi aj toh mera haath ka hi khain ge, and sachi you won my heart you really did, pizza fries bhi banai thay meray liye uff innay tasty thay na ke ah ha ha, I remember the chocolate she used to save for me, adhi adhi 😂♥️, ap has kiun rahay hain? 💓 Kiun ke it's you and you're adorable my sweetheart, I remember your smile jab main tumhe nano ke kamray se bulanay aya tha, I remember your laughter when you were hiding behind athar mamu, I remember tumhara seeriyoon pe ana, I remember taking a twix wrapper with me back home, I remember your miss calls, direct call nahi karti thi 😂, mujhe yaad hai tumhara haath pakar ke stage par le kar jana, sign kartay huway apna haath tumhari Qamar par rakhna, mujhe yaad hain tumhara dil jo roshan hai, tumhara dil jo dhadakta hai, mujhe yaad hai tum se milna, mujhe yaad hai tumhaary forehead ko chumna, something special, mujhe yaad hai uss ka laptop pe insta se message karna ama se chup ke ♥️, mujhe yaad hain uss ko reminders dena, uss ka flirt karna, meray liye 5 dishes banana aik saath, uss ka red pehanana (uss tum hi ho okay ?😂(Koi our ho toh bhala😂) ) mujhe yaad hai uss ko earrings phenana, uss ko har baar necklace phenana, uss ke jhumke sambhalna, uss ka woh pehla hug 🫂 jab woh meray dil ke saath tham gai, uss ka meray haath ko utha ke apnay kandhay par rakhna, uss ka apnay haath se khilana, uss ki woh muskaan jab woh call pe hasti hai, uss ki woh hasi jab woh mujhe dekhti hai, woh hassi jo uss ke cheray ko roshan kar deti hai, woh chechahana, uss ka jab woh meri di hui cheez ko sambhal ke rakhti hai, mujhe yaad hai uss ki video recordings jo woh meray liye record karti hai fitcheck, mujhe yaad hai uss ka red se 4 baar jeetna, mujhe yaad hai uss ka sharmana, mujhe yaad hain woh lambi walks our uss ki kahaniyaan, mujhe abhi tak yaad hain uss ki naak ka shine karta hua koka, mujhe yaad hai mamu ke khataam ki meethai and also I remember bolain churiyaan, I remember uss ka tang toh nahi kar rahi main ap ko ?😂 I remember uss ka main nahi bolti ap se😂 I remember holding her hand, mujhe yaad hai sweet cream, mujhe yaad hai chaat pe noodles kahna, uss ka meray kandhay pe sar ko rakhna, Mujhe yaad hai uss ki meethi si awaaz jab maine presentation banai thi, I remember saath main namaz parhna, I remember zada comfortable hona beghum ka, I remember uss ka meray naam ki haath pe mehndi lagana, mujhe yaad hai uss ka gussa, haye cutie😂 I remember uss ke haath pe kisses karna, I remember gaari ke liye holder lena, I remember left our haan mujhe destination bhi yaad hai acha, mujhe follow karna bhi yaad hai, uss ki zulfain uss ke kaan ke peechay chupana bhi yaad hai, mujhe yaad hai woh takken ki game our jeetana uss ko(khud jeeti thi😂😘), mujhe yaad hai mumty se uss ko pakarna,, mujhe water puddles bhi yaad hain, mujhe yaad hai break time walk kartay huway masjid jana our uss se baatain karna, mujhe yaad hai hottie, mujhe yaad hai panadol medicine is you, bunks bhi yaad hain, mujhe yaad hai ducks dekh ke khil jana uss ka, mujhe yaad hai dr house dekhna pehli baar uss ke saath,♥️,mujhe yaad hai uss ko apnay seenay se lagana, yaad hai mujhe malteesars, phool walay sticker bhi yaad hain mujhe, yaad hai uss ka emotional ho ke kehna kon hun main, kiun kar rahain hain meray liye ap ye sab, asa lag raha hai koi special asmaan se utri hun main, yaad hai mujhe hum, yaad hai mujhe uss ki explaintions jab reply karnay main thora sa time zada lag jaya karta tha, yaad hai mujhe main ap ko call karti hun, call kar lijiye ga. Yaad hai nikkah ke baad ka message, apna aik hissa lahore chorna, yaad hai mujhe uss ko dekhtay our dekhtay reh jana, uss ki efforts, uss ke nakhre 😂, uss ka pyaar uss ki roshani, mujhe yaad hai Hamna Salik apni beghum ki choti choti khushiyaan, barfi se le kar stranger things tak, seeriyoon pe baithnay se le kar chaat pe necklace pehnanay tak, har aik hasi tak, har aik ride tak, har aik perfume tak, blessed se le ke lucky tak, ama ke phone se raat ko chupke se call karnay tak, ap ghar pe hain tak? Pamaal se le kar mala tak, whisper karnay se le kar I love you tak, meray shoulder pe mukka marne tak, har aik race tak, umer hayat se le kar raja gidh tak, gala kharaab honay tak, dil se dil tak, gol gapoon tak, movie dekhain se le kar movie baata dain tak, har khushi se ghum tak, mithu se olive tak, break pe hain ap uss se le kar classes ke darmiyaan mujhe video notes bhejne tak, ride pe le kar janay tak, zindagi se mout tak, aik honay tak, tum tak ♥️
Khair uff kuch lamhey yaad karo gi meray saath haan I know ye bhi lamhay hi hain par in detail nahi.
Tumhe pata hai mera favorite moment kya hai tumharay saath, nahi pata, jab Hamna Salik ne mera haath thama our apne seenay se lagaya our kaha neeno karain shahbash, mera sarr uss ke kandhe pe tha our woh subway surfer khel rahi thi, sweet cream order karwaya hua tha yaad hai😂 khala agai mind main and also my beghum attached to my back, uss ka woh hass ke gir jana, I'm here for you love, haath pakrain uper khenchu ap ko.
Aik our waqt tha jab she sat right beside me and held me cooler ke samne walay sofay pe maine kaha tha zada comfortable nahi ho rahi I was happiest man jee your man jee, I love you Hamna Salik  from the deepest parts of my soul, kabhi kabar uss se bhi zada kabhi nahi chata tumhe dukh dun kisi bhi kisam ka apni hifazat main rakhna chata hun tum ko, kabhi kabar maine ussey dukh bhi diye hain sorry for those moments when you felt alone, par pata hai I'll make up for them I always do yan phir try karun ga na kar saka cheezain theek toh remember I'm a human who loves you dearly, haan mujhe maloom hai kuch achay waqt nahi bhi guzaray par in those moments remember I still love you my black hole ♥️🫂 you'll always have me by your side, through your words, your beautiful si hasi and your glowing eyes ❤️, pata hai humaray virtual lamhay bhi kafi speacial guzrain hain, tumhe yaad hai jab tum Mazhar Mamu ki taraf gai thi and you told me to call you in the morning saaray so rahay thay just for that ride, my beghum, my Hamna woke up, mujhe yaad hain lambay lambay voice notes jo main subha uth ke sunta tha, tum se hi, awwaz achi hai ap ki 🫂♥️,
Poocti hun main ap se, I'll always be your safe space, I'll always be waiting for you at the other end(deegree ko saal ho gaya yay), haath pakar ke deegree saath karain ge maine bhi toh leni hai, haan no bunks warna beghum ki gunda gardi start, I miss your gunda gardi Jaan, meri bohat khawaish hoti hai jab aoun toh beghum ke haath ka zaroor kahoon jesay shuru main khata tha dil se itnay pyaar se banati thi na meri beghum full dil ke saath, par I know it's hard for you no worries abhi toh umer parri hai, Edinburg bhi toh jana hai, naughty naughty bhi toh hona hai😂♥️, par pata hai aik masla hai woh.... meray saath gao jesay humesha gati ho, woh bhi apnay na huway, dil bhi gaya haathoon se,, gaa rahi ho ye meri taraf se ap ko aik virtual hug hai, meri beghum ko notes pasand hain na. Khayal Rakhain apna ♥️😘 dherr sara. Hum yun hi akay chalay jain ge, bas kuch lafz reh jain ge kuch lamhay, kuch muskarahatain our ansoo and with time they'll fade away too, remember you're not alone. I'm a call away ♥️😘. Tumhe pata hai main abhi bhi tumhare papers ke din uth ke Dua karta hun wesay daily 9 bja uthta hun, Haan aik 2 baar miss bhi zaroor hui hai par I'm here even though I might not say, haan kuch unseen efforts zaroor hoti hain, meri beghum bhi karti hai uss ki dua mukhlis hai meray liye haina ♥️, remember you used to say "ap bhi toh karte hain" pata hai maine soch liya hai tumhari pocket money ka, nikkah namay pe likh lo kon hai poochne wala 😂, hum thora different karain ge hum logoon ko thori follow karte hain ♥️, it will be 10% of what I earn, theek hai, toh salary increase pocket money will also ♥️♥️ done hai?, do you know ramzan chal raha hai 😂, tumharay liye toh anniversary hai par it's ramzan ♥️. I want you to know ke I'm a human(not boy) and sometimes kabhi kabhi dil (jis dil main tum ho) uss se kaam nahi le paya, I'm sorry unn lamhoon ke liye jab meray lafz bhari ho gai hoon tumhare liye, jab bhi main patient nahi raha, yan gentle nahi raha, humesha koshish karta rahu ga gussay main uncha na bolun, humesha samjhaun piyaar se, you know, you matter to this idiot.
ThankYou for trying, for respecting me, for trusting me, for holding my hand, maine kabhi promise nahi kiya haan words diye hain unn pe kaheen na kaheen pura bhi utra hun, par aj aik promise I'll always love you in the way you deserve, aik philosophy khikhi, 
Everyone has flaws, Flaws yan galtiyaan oopsi dipsies hoti hain har kisi main par wohi humain insaan banati hain, we humans should be fond of them unn ko dekhnay ka nazariya galat hai, flaws define us they help us look within for us to change to grow out of our shell, we'll only grow when we take on discomfort, jab hum flaws ke saath lartay hain, I'll always ask for your feedback for me to grow open transparency yaad haina♥️, our flaws may define us, but our actions and words shape our identity ♥️🫂, actions build character.

Assalam o Alikum My Husband🌹 Today was the day I waited for the most & I am glad that it passes by writting you mine. Alhamdullilah.❤️ With Allah as our witness we have been united in this beautiful bond, one build on faith, trust & devotion. Allhamdullilah for this beautiful blessing, for this love Allah has written for us. I thank you for completing my deen.🪷 As our journey begins I just wanted you to know that I am nothing but a human, I am not perfect, I have flaws within me, will make mistakes. I request you to forgive that mistakes, dantna nhi samjha diya karna. I will try my level best not to repeat that mistake. I pray that we always find comfort in each other. May Allah grant you with the best of my character, faith and kindness🌻 As we stand side by side, I promise to be loyal with you, to respect, and support you through every smile, every challenge that life brings our way. From today you are my safe place, my best friend, and my greatest blessing, Allah has bless me with💐 I pray that Allah keeps our hearts connected, our love strong, and our journey filled with countless beautiful memories🌹 I look forward to building a home filled with peace, happiness, and the mercy of Allah. Alhamdulillah for this beautiful beginning, and for you ♥️.

Beghum you have been my support through every smile of yours, You've repected me 90%, Loyal 100% haina?😂(Mazak mazak), I'm your safe place, iss para main Ameen nahi tha (feedback😂), Ameen Love, completing your note one year later, Ameen 1000 times♥️. My intentions ap ko apni responsibility (inni piyari responsibility 💓🫂) ko le kar will always be pure, apni masoom si beghum ke saath only surprises hain, piyaray se for a lovely human being 💟

Pata hai kiun ke Ramzan chal raha hai, our mujhe pata hai ke beghum ko Sikander ki dua kitni achi lagti hai toh, today I'll make a dua.

Ya Khuda, mujhe maloom hai Tu mujhe sun raha hai,
 kahin na kahin mere dil ki awaaz Tere tak zaroor pohanch rahi hai.
Ya Allah, main na koi alim hoon, na koi bohat naik shaks,
 na main sajde mein hoon, na Teri bargah main, na teray saamne khara hoon,
 magar phir bhi Tere darr par hi aya hoon, kyun ke Tu hi dilon ka Malik hai.
Ya Rabb, agar main koi nabi hota toh apni ummat ke liye dua karta,
 agar main koi buzurg ya naik insaan hota toh tamam Musalmano ke liye mangta,
 lekin aaj main Tere paas ek tootay hue dil ke saath aya hoon,
 aur aik khoobsurat shakhs ko mangne aya hoon.
Ya Allah, Tu har cheez par Qadir hai,
 Tu “Kun” keh de toh namumkin bhi mumkin ho jata hai.
 Ya Allah, agar uss mein meri khair hai,
 toh Hamna Salik ko mere naseeb mein likh de.
Usay sirf aik martaba nahi,
 har din, har subah, har dua ke baad mera likh de.
 Uska pyaar mere liye likh de,
 uski hasi meri rooh ka sukoon likh de,
 aur uska har aik dukh mera likh de, Uss ka har aik Ansoo meray hisaay likh de.
Ya Allah, Tu dilon ko phairne wala hai,
 agar iss mein khair hai,
 toh uska dil narmi ke saath meri taraf mor de,
 na zabardasti se, na takleef se,
 balke rehmat aur sukoon ke saath.
Ya Rabb, uske dil ki hifazat farma,
 us par kabhi aisi takleef na aane dena jo usay tod de.
 Uski zindagi mein rehmat, sukoon aur roshni likh de,
 Main janta hun uska rasta mere saath hai, dua ye hai ke uss ka dil meray saath mehfooz ho.
Aur Ya Allah, mera dil bhi jaanch le,
 agar meri mohabbat sachchi, paak aur halal hai,
 toh usay izzat aur khair ke saath uske hissa mein likh de.
Ya Khuda, main bas itna chahta hoon:
 Ke tu hamare darmiyan mohabbat, reham aur sukoon likh de,
 aur agar nahi,
 toh mere dil ko sabr, raza aur Teri marzi par raazi rehne ki taqat ata farma.
Tu dilon ke haal janta hai,
 Tu Janta hai
Ameen.
Beghum I Adore you just the way you are, repaet karna chor dain bas 🤣, par waqai I adore you just as you are the way she grabs my arms, the way she smiles when she looks at me, she's the noor of my eyes, uss ke fit checks, uss ki baatain jab woh kehti hai "pata hai aj kya hua", "mujhe aik nai baat pata chali", par sab se zaida I love her soft voice, her kind heart jo bahir se toh tough hai, par andar se utna hi nazuk(not weak), glowing heart, jo sirf mera  liye shine karta hai💓💓 I love when she speaks with love, with affection, I feel in love with her most organic self, woh Hamna jo mujhe good morning selfie bhejti hai, woh Hamna jo mask laga kar snaps bhejti hai, woh Hamna Salik jo apnay bachpan ki baatain itni khushi se bayaan karti hai, woh Hamna jo Novels parhti hai phir akay mujhe twists nahi baatati, Woh Hamna jo Meray dil ke upr walay hissay main jagha bana rahi hai, woh Hamna jo malls main se calls karti hai, jo mujh se poochti hai "ap break pe hain?", "ghar poonch gai hain ap?" Woh jo  haath pe perfume laga ke pyaar se meray haathoon pe lagti hai.

Pata hai I'm holding your hand virtually, khushboo arahi hai wow, while you're reading this, I'm letting you know I'm here and not leaving your side, I'm here holding your hand, listening to your "Haye Allah" I'm letting you know I'm not chasing you, I'm standing here, not forcing you or convincing you to hold on, you'll always have me holding on to your hand until you hold on, until you don't let go, you'll always be making a choice to have me, just hold on I'll never be forcing you to do anything, just letting you know idhar hi hun 💓 💓 , hum idhar hi hain, we'll figure everything out together Inshallah.

Hamna Salik hum end pe poonch gai hain, par kuch baatain hai jo kehni baqi hain, I adore you Hamna Salik nahi toh our kis ko karain ge, hain?, I miss your haq jatana. Pata hai balke yaad hai "Anyone can fall in love with the flowers but its beautiful to fall in love with something ordinary as the leaves" I’ll add something “these memories efforts that we make for eachother are the roots they’ll always need water”
Pata hai sometimes I wonder about you, about your smile and your laugh, I want to navigate Hamna Salik, I want to understand you fully aik aik cheez ap ke baaray main jannana chata hun, ke uss ko chai kab se pasand hai, Uss ko nature se pyaar kab hua, woh jab raat ko apnay puranay ghar main taroon ke neechay lait ke soya karti thi toh kon si kahani ke baaray main sochti thi?, woh jab dua mangti hai toh kis tarah mangti hai, she always makes me feel like I'm her man.

You know ap kafi arsay baad ye message parh rahi hoon gi just wanted to let you know Eid Mubarak Beghum and also maine pehle likha hai ye 
Happy 1 year anniversary 🫂♥️, pata hai tum rotay huway bilkul achi nahi lagti, I hope you're smiling, tumhe shyd ye na pata ho par kuch patharoon main se hirray bhi nikaltay hain ? samghi yan nahi? Hamna Salik Marble torna paray ga haan wohi jahan mera haath hai, side se bhi khul sakta hai shyd try karna ask Talha, I hope everything goes as planned, shooting and all, I know Hamna I know iss saal bhi I'll be returning home with beautiful memories of us which are most meaningful, I want you to feel what you're feeling fully, If you do decide to call  break the marble🫂 (mehwish)my wish.

Hum tum kitne paas hain
Kitne door hain chaand sitare
Sach poochho to man ko
Jhoote lagte hain yeh saare
Magar sachche lagte hain
Yeh dharti, yeh nadiya, yeh raina
Aur, tum


\n\n`}
          </div>

          {/* Music Player (above image slider) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={toggleMusic}
              className="group flex items-center gap-2 bg-pink-600/70 hover:bg-pink-700 backdrop-blur-sm px-5 py-2 rounded-full transition-all shadow-lg hover:scale-105"
              style={{ boxShadow: "0 0 15px #8b0000" }}
            >
              <span className="text-2xl">
                {isPlaying ? "🎵❤️" : "🎵♡"}
              </span>
              <span className="font-medium">
                {isPlaying ? "Stop" : "Dil se Music Bajao(click karo)"}
              </span>
            </button>
          </motion.div>

          {/* Image Slider with romantic frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-full max-w-3xl mx-auto mb-16"
          >
            <div
              className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl border-4 border-pink-300/50"
              style={{
                boxShadow: "0 0 50px #8b0000",
                background: "linear-gradient(135deg, #2d0000, #4a0404)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Memory ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            {/* Navigation buttons (heart-shaped) */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pink-600/80 hover:bg-pink-700 text-white p-3 rounded-full backdrop-blur-sm transition text-2xl w-12 h-12 flex items-center justify-center"
              style={{ boxShadow: "0 0 15px #8b0000" }}
            >
              ❤
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pink-600/80 hover:bg-pink-700 text-white p-3 rounded-full backdrop-blur-sm transition text-2xl w-12 h-12 flex items-center justify-center"
              style={{ boxShadow: "0 0 15px #8b0000" }}
            >
              ❤
            </button>

            {/* Dots with heart pulses */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentIndex
                      ? "text-pink-400 scale-125"
                      : "text-gray-400 hover:text-pink-300"
                  }`}
                >
                  {idx === currentIndex ? "❤️" : "○"}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold px-10 py-4 rounded-full text-xl hover:scale-105 transition-transform shadow-lg"
              style={{ boxShadow: "0 0 30px #8b0000" }}
            >
              Begin Again
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating sparkles (extra romance) */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-white text-opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    </main>
  );
}