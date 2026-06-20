// Dynamic data store for birthday moments
const momentsData = [
    {
    id: 0,
    description: "ลองเอารูปหนูในเครื่องมาทำดู รูปที่เก็บไว้ ส่วนใหญ่อ่ะนะ\n\nดูบนมือถือนะ ในคอมน่าจะเพี้ยนๆ😁",
    isTextOnly: true
  },
  {
    id: 1,
    description: "รูปแรกๆที่แอบถ่ายไว้📸\nตอนนั้นบัวกำลังเล่นกีตาร์ พี่ว่าเท่ดีเลยเก็บเอาไว้\n\nลองแตะๆที่รูปดู"
  },
  {
    id: 3,
    description: "เซตนี้มาจากถ่ายรูปเล่นกันจากกล้องใหญ่กัน\nรูปเยอะอยู่แต่เอามาแค่นี้พอ"
  },
  {
    id: 4,
    description: "รูปวันเดียวกับที่เล่นกล้องกันเลยแต่บัวเอาไปแต่งมา รูปสวยมาก😊\n\nชอบรูปแรกมากๆ เวลาบัว focus ทำอะไรสักอย่างมุมเผลอน่ารักสุดๆ"
  },
  {
    id: 6,
    description: "รูปนี้ตอนที่ไปบางแสน🏖️\nตอนเช้าไปเดินถ่ายรูปด้วยกัน\n\nอย่างว่าเวลาบัว focus\nทำอะไรสักอย่างมันน่ารักดี"
  },
  {
    id: 7,
    description: "รูปนี้จำไม่ได้ว่าหนูไปถ่ายตอนไหน แต่ชอบนะ👏 ฟิลเซลฟี่น่ารักสดใส"
  },
  {
    id: 8,
    description: "เซตรูปมุมเผลอ📸\nตอนนั้นคิดว่ากดไปเยอะนะ\nแต่เครื่องมันไม่สู้\nได้รูปมาน้อยมากเลย🥲"
  },
  {
    id: 9,
    description: "แต่ได้รูปที่ชอบมากในเซตมา🫠\nรูปนี้มันเบลอนะ\nแต่ดูแล้วรู้สึกภาพมันชัด"
  },
  {
    id: 10,
    description: "ไปถ่ายรูปเล่นกัน\nรูปแรกชอบที่สุด ไม่รู้ทำไม\n\nเป็นเซตรูปที่ไม่มีบัวในรูปเลย\nแต่เหมือนเห็นหนูอยู่ในรูปตลอด"
  },
  {
    id: 13,
    description: "อันนี้ช่วงบัวทำงานรูม\nแต่ใจดีแวะมาหาพี่ด้วย\nได้ไปกินอะไรด้วยกันนิดหน่อย"
  },
  {
    id: 11,
    description: "บัวถ่ายสภาพตอนแต่งหน้ามาให้ดู น่ารักมากได้คะแนนไป💯"
  },
  {
    id: 0,
    description: "อย่าได้คิดว่ามีแต่รูปปกติ\nมันต้องมีรูปหลุดๆกันบ้าง...",
    isTextOnly: true
  },
  {
    id: 5,
    description: "รูปตอนเล่นพูลกัน ทรงเท่ๆตึงๆ😎\nแอบถ่ายให้รู้ตัว 5525245+"
  },
  {
    id: 14,
    description: "สภาพหลังทำรูมสักวัน\nบัวขึ้นมาแลปแล้วก็หลับไปเลย\nน่าจะเหนื่อยจริง เพราะงั้น\n\nหาเวลาพักผ่อนเยอะๆน้าา🤗"
  },
  {
    id: 15,
    description: "ตอนนี้น่าจะเล่นเกมด้วยกันครั้งแรก ตั้งใจดูเกมมากกก🎮"
  },
  {
    id: 16,
    description: "ไปกินหมูกระทะกัน บัวนั่งร้องไห้ ควันเข้าตา"
  },
  {
    id: 17,
    description: "วันนั้นน่าจะกินเบียร์กันที่แลปกัน บัวโดนงานมาหนักจนร้องไห้เลย\nเป็นห่วงมากกเลย\n\nวันนั้นเฝ้าบัวนอนที่แลปรอหอเปิด\nตอนนอนก็ดูน่ารักดีนะ สงบดี"
  },
  {
    id: 18,
    description: "บัวถ่ายมาให้ดูว่า\nเปิด Diffusers ที่เคยซื้อให้ใช้"
  },
  {
    id: 19,
    description: "วันใกล้ค่าย พาบัวไปนั่งทำงาน\nตั้งใจทำงานมากตอนนั้น แถมจัดขนมชุดใหญ่ไปอีก"
  },
  {
    id: 20,
    description: "ไปเที่ยวดูหนังกัน 4 คน\nบัวทรงพี่คนโตมาก\nพาน้องอีก 2 คนมาเที่ยว"
  },
  {
    id: 27,
    description: "พยายามถ่ายรูปที่กินข้าวด้วยกันไว้ให้ได้ตลอด"
  },
  {
    id: 28,
    description: "อันนี้น่าจะรูปแรกที่ได้ถ่าย\nพี่ดันถ่ายแค่สองคน โดนทายแซวไปที\nตอนนั้นความลับยังไม่แตกด้วย"
  },
  {
    id: 29,
    description: "เฝ้าบัวกินข้าวก่อนขึ้นหอ\nmoment \"กางอาณาเขต\""
  },
  {
    id: 30,
    description: "อันนี้แคปที่เคยคอลกันไว้\nคิดว่าน่าจะครบทุกครั้งที่ได้คอลกัน📞"
  },
  {
    id: 31,
    description: "คอลนี้น่าจะฮิลใจสุด บัวง่วงมาก!\nแต่หนูยอมอยู่คุยด้วยกัน\nเพราะพี่ต้องตื่นเช้า\nบัวกลัวพี่หลับแล้วตื่นไม่ทัน\nน่ารักที่สุดเลยย💕"
  },
  {
    id: 100,
    description: "รูปหมดแล้วอ้าา ได้ถ่ายน้อยเกิน\nก็รวบรวมความทรงจำมาได้ประมาณนี้ ถึงจะได้สนิทกันในช่วงสั้นๆ\nแต่ก็ดีใจนะที่ได้เจอ...",
    isTextOnly: true
  },
  {
    id: 100,
    description: "สุขสันต์วันเกิดนะค้าบ🎉\nโตขึ้นอีกปีแล้วนะ ไม่รู้จะอวยพรอะไร\nเอาเป็นพี่จะคอยเป็นกำลังใจให้หนู\nมีอะไรทักมาหาได้เลย\nจะคอยอยู่ซัพพอร์ตให้ได้มากที่สุด\n\nแล้วก็ขอบคุณนะ ที่เข้ามาในชีวิตพี่\nเดี๋ยวพี่ก็ไม่ได้อยู่ใกล้ๆแล้ว คิดถึงหนูแน่ๆ แต่นั่นแหละจะคอยซัพพอร์ตเสมอไม่ว่าผลลัพธ์มันจะเป็นยังไง\n\nมีความสุขมากๆนะคับ🥳",
    isTextOnly: true
  }
];

// Helper to check if an image exists by loading it
function checkImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Dynamically discover images for all moments (supporting png, jpg, jpeg)
async function loadMomentsImages() {
  const extensions = ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'];
  
  for (const moment of momentsData) {
    if (moment.isTextOnly) continue; // Skip text-only slides
    
    moment.images = [];
    let imgIdx = 1;
    let foundInIndex = true;

    while (foundInIndex) {
      foundInIndex = false;
      
      // Probe all extensions in parallel for the current image index
      const probes = extensions.map(ext => {
        const filename = `${moment.id}_${imgIdx}.${ext}`;
        const url = `assets/gallery/${filename}`;
        return checkImage(url).then(exists => exists ? filename : null);
      });
      
      const results = await Promise.all(probes);
      const foundFile = results.find(res => res !== null);
      
      if (foundFile) {
        moment.images.push(foundFile);
        imgIdx++;
        foundInIndex = true;
      }
    }
  }
}
