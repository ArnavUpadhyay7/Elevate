// const mongoose = require("mongoose");
// const bcrypt   = require("bcrypt");
// require("dotenv").config();

// const Coach = require("./models/coach.model");

// const MONGO_URI = process.env.DB_connect;

// const PROFILE_PICS = [
//   "https://i.pinimg.com/736x/91/e3/ca/91e3caaa1525c5b4d820633aee2e4cb7.jpg",
//   "https://i.pinimg.com/736x/07/24/8a/07248a168651d09f99bd5448f761a4ee.jpg",          
//   "https://i.pinimg.com/736x/3d/8b/ea/3d8bea8149beb4f881f3caba8be752e1.jpg",          
//   "https://i.pinimg.com/736x/dc/ec/70/dcec70f8800b627942c683976c00fa63.jpg",       
//   "https://i.pinimg.com/1200x/c3/94/d1/c394d1182266bfa9ccb5b56be035ca06.jpg",           
//   "https://i.pinimg.com/1200x/d3/a7/81/d3a78119a667a095d6d39321ae271ed9.jpg",           
//   "https://i.pinimg.com/1200x/68/d4/a2/68d4a2824cc4eeeb56b29145ced233a0.jpg",          
//   "https://i.pinimg.com/736x/ed/ac/99/edac997907060d6e761b8716bcc0469a.jpg",           
//   "https://i.pinimg.com/736x/5b/11/33/5b1133e6c1a3ae4592c2893e2c933f13.jpg",     
//   "https://i.pinimg.com/1200x/23/6e/ba/236eba673a4502520f79fd3eabf8a0dc.jpg",       
//   "https://i.pinimg.com/736x/9c/f9/0d/9cf90d315a50cfc3f4897eb592353035.jpg",      
//   "https://i.pinimg.com/1200x/d1/ff/74/d1ff747f8309e68036de7213b2fc00d9.jpg",
// ];

// const coaches = [
//   { fullname: "Aiden Frost",   email: "aiden@elevate.com",  about: "Radiant Duelist coach specializing in entry mechanics and aggressive off-angle plays. Known for breaking down duel scenarios frame by frame.",              rate: 499.99, rank: "Radiant",    role: "Duelists"     },
//   { fullname: "Sofia Blaze",   email: "sofia@elevate.com",  about: "Immortal 3 controller expert focused on macro play and smokes lineups. Helps players understand how utility shapes round economy.",                        rate: 349.99, rank: "Immortal 3",  role: "Controllers"  },
//   { fullname: "Liam Vortex",   email: "liam@elevate.com",   about: "Radiant Initiator coach mastering info gathering and flash coordination. Specializes in synchronized team executes.",                                      rate: 459.99, rank: "Radiant",    role: "Initiators"   },
//   { fullname: "Maya Phantom",  email: "maya@elevate.com",   about: "Immortal 2 sentinel coach for defensive mastery. Teaches trip placement, watch angles, and anchoring strategies for tight clutch situations.",             rate: 299.99, rank: "Immortal 2",  role: "Sentinels"    },
//   { fullname: "Noah Striker",  email: "noah@elevate.com",   about: "Diamond 3 aim improvement specialist. Focuses on crosshair placement, pre-aim habits, and counter-strafing technique through structured VOD review.",      rate: 249.99, rank: "Diamond 3",  role: "Duelists"     },
//   { fullname: "Aria Pulse",    email: "aria@elevate.com",   about: "Radiant controller focused on utility timing and post-plant setups. Coaches players on reading enemy patterns and adapting mid-round.",                    rate: 479.99, rank: "Radiant",    role: "Controllers"  },
//   { fullname: "Ethan Shadow",  email: "ethan@elevate.com",  about: "Immortal 3 lurker coach improving decision making and timing reads. Expert at teaching slow-push mechanics and creating separation from your team.",       rate: 389.99, rank: "Immortal 3",  role: "Sentinels"    },
//   { fullname: "Zara Nova",     email: "zara@elevate.com",   about: "Radiant entry fragging expert. Teaches aggressive timing windows, jiggle peeking, and how to take space efficiently without over-committing.",             rate: 519.99, rank: "Radiant",    role: "Duelists"     },
//   { fullname: "Lucas Ember",   email: "lucas@elevate.com",  about: "Diamond 3 controller tempo specialist. Focuses on proactive smoking and cutting off rotations before they happen.",                                        rate: 279.99, rank: "Diamond 3",  role: "Controllers"  },
//   { fullname: "Chloe Zenith",  email: "chloe@elevate.com",  about: "Immortal 2 communication coach. Teaches callout structure, micro-communication during rounds, and how to IGL effectively without disrupting teammates.",   rate: 309.99, rank: "Immortal 2",  role: "Initiators"   },
//   { fullname: "Ryan Spectre",  email: "ryan@elevate.com",   about: "Radiant IGL tactical mentor. Covers full strategy — map control, eco management, and mid-round calls. Best suited for players wanting a complete overhaul.", rate: 549.99, rank: "Radiant",   role: "Controllers"  },
//   { fullname: "Elena Rift",    email: "elena@elevate.com",  about: "Immortal 3 aim and VOD review specialist. Deep dives into every death, trade attempt, and positional error to rebuild muscle memory from the ground up.",  rate: 369.99, rank: "Immortal 3",  role: "Duelists"     },
// ];

// async function seedCoaches() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ Mongo connected");

//     const hashedPassword = await bcrypt.hash("test123", 10);

//     const coachDocs = coaches.map((coach, i) => ({
//       ...coach,
//       password:       hashedPassword,
//       profilePic:     PROFILE_PICS[i],
//       payed_player:   [],
//       gameplayVideos: [],
//     }));

//     await Coach.insertMany(coachDocs);
//     console.log("🚀 12 Coaches seeded successfully");
//     console.log("🔑 Login password for all coaches: test123");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Seed failed:", error);
//     process.exit(1);
//   }
// }

// seedCoaches();