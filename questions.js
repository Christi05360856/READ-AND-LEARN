// ============================================
// ELITE BIBLE QUIZ - questions.js
// Clean Version for Testing
// ============================================

const questions = [
  // Test Question 1
  { 
    question: "According to John 18:1, the garden where Jesus prayed and was later betrayed was located over the brook of what name?",
    option: ["Brook Kidron", "Brook Kedron", "Brook Cedron", "Brook Jordan"],
    answer: 2
  },
  
  // Test Question 2
  { 
    question: "According to John 18:3, what three items did the band of officers and servants bring with them when they came to arrest Jesus?",
    option: ["Swords, staves, and shields", "Lanterns, torches, and weapons", "Trumpets, spears, and nets", "Chains, ropes, and clubs"],
    answer: 1
  },

  { 
    question: "During which event in John 19:26 did Jesus say to His mother, 'Woman, behold thy son'?",
    options: ["During the trial before Pilate", "During His crucifixion", "During the Last Supper", "During the triumphal entry"],
    answer: 1
  },
  
  { 
   question: "According to the Gospel accounts, what were among the first words Jesus spoke from the cross?",
    options: ["Woman, behold thy son", "Father, into thy hands I commend my spirit", "My God, my God, why hast thou forsaken me", "Father, forgive them; for they know not what they do"],
    answer: 3
  },
  
  { 
    question: "According to John 19:30, what were the final words Jesus spoke from the cross?",
    option: ["Father, into thy hands I commend my spirit", "It is finished", "My God, my God, why hast thou forsaken me", "Today shalt thou be with me in paradise"],
    answer: 1
  },
  
  { 
    question: "How many curtains of goats’ hair were made for the Tabernacle?", 
    options: ["10", "11", "12", "15"], 
    answer: 1 
  },
  
  { 
    question: "According to John 19:29, what was given to Jesus when He said 'I thirst'?",
    options: ["Wine mingled with myrrh", "Water from a sponge", "Vinegar on hyssop", "Sour wine on a reed"],
    answer: 2 
  },
  
  { 
     question: "According to Matthew 27:58, Mark 15:43, Luke 23:50-52, and John 19:38, who begged Pilate for the body of Jesus?",
    answers: ["Joseph of Arimathaea", "Nicodemus", "Mary Magdalene", "John the beloved disciple"],
    correct: 0
  },
  
  { 
    question: "According to John 19:39, who brought a mixture of myrrh and aloes, about an hundred pound weight, for the burial of Jesus?",
    answers: ["Mary Magdalene and Mary the mother of James", "Joseph of Arimathaea and Gamaliel", "Nicodemus", "Peter and John"],
    correct: 2
  },
  
  { 
    question: "What two items besides the tablets were placed inside the Ark of the Covenant?", 
    options: ["Aaron’s rod and jar of manna", "Urim and Thummim", "Golden calf pieces", "Incense altar"], 
    answer: 0 
  },
  
  { 
    question: "According to John 19:17, Golgotha was the Hebrew name for what location?",
    answers: ["The place of weeping", "The place of prayer", "The place of a skull", "The place of suffering"],
    correct: 2
  },
  
  { 
   question: "According to John 20:19, what were the first words Jesus spoke to His disciples when He appeared to them after His resurrection?",
    options: ["Fear not, for I am with you", "Peace be unto you", "Why are you troubled?", "Receive ye the Holy Ghost"],
    answer: 1
  },
  
  { 
    question: "In John 20:19 and 20:26, how many times did Jesus say unto His disciples 'Peace be unto you' in these post-resurrection appearances?",
    options: ["Once", "Twice", "Thrice", "Seven times"],
    answer: 1
  },
  
  { 
    question: "How many spies did Moses send to explore Canaan?", 
    options: ["10", "12", "40", "70"], 
    answer: 1 
  },
  
  { 
    question: "Which tribe received no land inheritance because the Lord was their portion?", 
    options: ["Judah", "Levi", "Joseph", "Benjamin"], 
    answer: 1 
  },
  
  { 
    question: "According to John 20:19-24, which of the twelve disciples was NOT present when Jesus first appeared to the disciples after His resurrection?",
    options: ["Judas Iscariot", "Thomas called Didymus", "Both Judas and Thomas", "Philip"],
    answer: 1
  },
  
  { 
    question: "At what age did Levites begin their service in the Tabernacle?", 
    options: ["20", "25", "30", "50"], 
    answer: 2 
  },
  
  { 
    question: "According to John 21:2, how many disciples were together at the Sea of Tiberias when Jesus showed Himself to them there?",
    options: ["Five", "Six", "Seven", "Eleven"],
    answer: 2
  },
  
  { 
    question: "The dialogue where Jesus asks Peter ' Simon, son of Jonas, lovest thou me more than these?' can be found in which chapter of John?",
    options: ["John 18:15", "John 20:5", "John 21:15", "John 19:26"],
    answer: 2
  },
  
  { 
    question: "According to John 21:15-17, what was Jesus' response to Peter's affirmation that he loved Him?",
    options: ["Follow me", "Feed my lambs", "Feed my sheep", "Both B and C"],
    answer: 3
  },
  
  { 
    question: "According to Acts 1:1, to whom was the book of Acts addressed as the 'former treatise'?",
    options: ["Theophilus", "Timothy", "Titus", "Philemon"],
    answer: 0
  },
  
  { 
    question: "According to Acts 1:10-11, who spoke to the disciples saying, 'Ye men of Galilee, why stand ye gazing up into heaven?'",
    options: ["An angel of the Lord", "Two men in white apparel", "The Holy Spirit", "A voice from heaven"],
    answer: 1
  },

  { 
    question: "According to Acts 1:13, how many apostles were gathered together in the upper room after Jesus' ascension?",
    options: ["Ten", "Eleven", "Twelve", "One hundred and twenty"],
    answer: 1
  },
  
  { 
    question: "According to Acts 1:23, which two men were appointed as candidates to replace Judas Iscariot?",
    options: ["Joseph called Barsabas, who was surnamed Justus, and Matthias", "Barnabas and Silas", "Stephen and Philip", "Timothy and Titus"],
    answer: 0
  },
  
  { 
    question: "How many priests carried the Ark while marching around Jericho?", 
    options: ["4", "6", "7", "12"], 
    answer: 2 
  },
  
  { 
    question: "What three items did Achan steal from Jericho?", 
    options: ["Gold, silver, and a Babylonian robe", "Weapons and food", "Silver only", "Idols"], 
    answer: 0 
  },
  
  { 
    question: "Where was Achan and his family judged?", 
    options: ["Valley of Achor", "Ai", "Gilgal", "Jericho"], 
    answer: 0 
  },
  
  { 
    question: "What miracle happened during the battle at Gibeon?", 
    options: ["The sun and moon stood still", "Hailstones fell", "The Jordan dried up", "Walls fell"], 
    answer: 0 
  },
  
  { 
    question: "Upon whom did the lot fall when the apostles cast lots to choose a replacement for Judas Iscariot, according to Acts 1:26?",
    options: ["Joseph called Barsabas", "Matthias", "Barnabas", "Paul"],
    answer: 1
  },
  
  { 
    question: "According to Acts 1:24-26, how was Judas Iscariot's replacement chosen?",
    options: ["Peter Decision", "Vote of all the disciples", "By casting lots", "By drawing names from a vessel"],
    answer: 2 
  },
  
  { 
    question: "According to Acts 2:16, which Old Testament prophet did Peter quote when he said, 'This is that which was spoken by the prophet'?",
    options: ["Isaiah", "Joel", "Jeremiah", "Ezekiel"],
    answer: 1 
  },
  
  { 
    question: "According to Acts 2:34, Peter quotes the words 'The LORD said unto my Lord' which were originally spoken by whom and found in what book?",
    options: ["Moses in Deuteronomy", "David in Psalms", "Isaiah in his prophecy", "Jeremiah in Lamentations"],
    answer: 1
  },

  { 
    question: "Who was the father of King Saul?", 
    options: ["Kish", "Jesse", "Ner", "Abner"], 
    answer: 0 
  },
  
  { 
    question: "What did Saul offer that caused Samuel to rebuke him?", 
    options: ["A forbidden sacrifice", "His daughter in marriage", "The best spoils", "His crown"], 
    answer: 0 
  },
  
  { 
    question: "According to Acts 4:6, who were the four mentioned as being part of the high priest's family or associates?",
    options: ["Caiaphas, John, Alexander, and Annas", "Annas, Caiaphas, Gamaliel, and Nicodemus", "Pontius Pilate, Herod, Caiaphas, and Annas", "Peter, James, John, and Andrew"],
    answer: 0
  },
  
  { 
    question: "According to Acts 4:19, who responded to the Jewish leaders saying, 'Whether it be right in the sight of God to hearken unto you more than unto God, judge ye'?",
    options: ["Peter and John", "Stephen and Philip", "Paul and Barnabas", "All the apostles"],
    answer: 0 
  },
  
  { 
    question: "According to Acts 4:36-37, who was first introduced as a companion of the apostles known for his generous gift?",
    options: ["Barnabas", "Matthias", "Stephen", "Philip"],
    answer: 0
  },
  
  { 
    question: "How many times did David spare Saul’s life when he had the chance?", 
    options: ["Once", "Twice", "Three times", "Four times"], 
    answer: 1 
  },
  
  { 
    question: "Who did Saul consulted at Endor? (1 Samuel 28)",
    options: ["Hildia", "Medium of Endor", "Not named", "Witch of Endor"], 
    answer: 3 
  },
  
  { 
    question: "How many mighty men did David have in his elite group?", 
    options: ["3,000", "300", "600", "30"], 
    answer: 3
  },

  { 
    question: "Which prophet saw a vision of dry bones coming to life? (Ezekiel 37)", 
    options: ["Daniel", "Ezekiel", "Zechariah", "Hosea"], 
    answer: 1 
  },
  
  { 
    question: "What was the name of Hosea’s unfaithful wife?", 
    options: ["Gomer", "Rahab", "Jezebel", "Delilah"], 
    answer: 0 
  },
  
  { 
    question: "How many years did Isaiah walk naked and barefoot as a sign? (Isaiah 20)", 
    options: ["1 year", "2 years", "3 years", "5 years"], 
    answer: 2 
  },
  
  { 
    question: "According to Acts 4:36, who is described as 'the son of consolation'?",
    options: ["Timothy", "Silas", "Barnabas", "Luke"],
    answer: 2
  },
  
  { 
    question: "What unusual command did God give Ezekiel regarding his food? (Ezekiel 4)", 
    options: ["Bake bread with dung", "Eat only honey", "Drink only water", "Fast for 40 days"], 
    answer: 0 
  },
  
  { 
    question: "Which minor prophet was a shepherd and fig tree farmer?", 
    options: ["Haggia", "Obadiah", "Micah", "Amos"], 
    answer: 3
  },

   { 
    question: "______ king consulted Baal-zebub about his injury?", 
    options: ["Jeoboam", "Hezekiah", "Joram", "Ahaziah"], 
    answer: 3 
  },

  { 
    question: "Identify the valley where God instructed Ezekiel to prophesy to dry bones.", 
    options: ["Valley of Hinnom", "Valley of Decision", "Valley of Dry Bones", "Valley of Jehoshaphat"], 
    answer: 2 
  },
  
  { 
    question: "According to 2 Kings 20, how many years did God add to King Hezekiah’s life after his prayer?", 
    options: ["10", "12", "15", "20"], 
    answer: 2 
  },
  
  { 
    question: "Which prophet’s book contains the verse 'But let justice roll on like a river'?", 
    options: ["Isaiah", "Amos", "Micah", "Hosea"], 
    answer: 1 
  },
  
  { 
    question: "In the book of Daniel, what new names were given to Hananiah, Mishael, and Azariah?", 
    options: ["Shadrach, Meshach, Abednego", "Belteshazzar, Shadrach, Meshach", "Daniel, Hananiah, Mishael", "None of the above"], 
    answer: 0 
  },
  
  { 
    question: "What specific instruction did God give Isaiah for three years as a prophetic sign?", 
    options: ["To shave his head", "To walk naked and barefoot", "To eat only locusts", "To remain silent"], 
    answer: 1 
  },
  
  { 
    question: "According to Acts 5:7, how much time elapsed between Ananias' death and when his wife Sapphira came in?",
    options: ["About one hour", "About three hours", "About six hours", "About twelve hours"],
    answer: 1
  },
  
  { 
    question: "Who was the only woman judge mentioned in the book of Judges?", 
    options: ["Deborah", "Jael", "Delilah", "Huldah"], 
    answer: 0 
  },
  
  { 
    question: "In Esther 4:14, Mordecai told Esther she may have come to the kingdom for such a time as this. What crisis was Israel facing?", 
    options: ["War with Amalek", "A decree of annihilation", "Famine", "Exile to Babylon"], 
    answer: 2
  },

  { 
    question: "Which king of Israel had the longest reign according to the biblical record?", 
    options: ["Jeroboam II", "Ahab", "Omri", "Manasseh of Judah"], 
    answer: 0 
  },
  
  { 
    question: "In the book of Jonah, what plant did God appoint to grow over Jonah for shade?", 
    options: ["Fig tree", "Vine", "Gourd", "Palm tree"], 
    answer: 2 
  },
  
  { 
    question: "What did Moses’ face do after descending from Mount Sinai with the second set of tablets?", 
    options: ["It shone with glory", "It became pale", "It was covered with a veil", "Both A and C"], 
    answer: 3 
  },
  
  { 
    question: "According to Ecclesiastes 12:13, what is the conclusion of the whole matter?", 
    options: ["Fear God and keep His commandments", "Fear the Lord Thy God", "All is vanity", "Wisdom is better than strength"], 
    answer: 0 
  },
  
  { 
    question: "Which Old Testament book ends with the word 'curse'?", 
    options: ["Malachi", "Zechariah", "Haggai", "Obadiah"], 
    answer: 0 
  },

  { 
    question: "What was Levi (Matthew)’s specific role before Jesus called him? (Luke 5:27)", 
    options: ["Tax collector", "Roman centurion", "Synagogue ruler", "Temple treasurer"], 
    answer: 0 
  },
  
  { 
    question: "How many times did Jesus pray the same words in Gethsemane before his arrest? (Matthew 26:44)", 
    options: ["Once", "Twice", "Three times", "Seven times"], 
    answer: 2 
  },
  
  { 
    question: "Who was forced to carry Jesus’ cross to Golgotha, and from which city was he?", 
    options: ["Simon of Cyrene", "Joseph of Arimathea from Jerusalem", "Nicodemus the Pharisee", "Simon Peter from Bethsaida"], 
    answer: 1
  },
  
  { 
    question: "What was the precise inscription Pilate placed on the cross according to John 19:19?", 
    options: ["King of the Jews", "This is Jesus the King of the Jews", "Jesus of Nazareth, the King of the Jews", "Son of God and King"], 
    answer: 2 
  },
  
  { 
    question: "For how many days did the resurrected Jesus appear to His disciples before ascending? (Acts 1:3)", 
    options: ["10 days", "20 days", "40 days", "50 days"], 
    answer: 2 
  },
  
  { 
    question: "Who was chosen by casting lots to replace Judas Iscariot among the Twelve? (Acts 1:26)", 
    options: ["Matthias", "Barnabas", "Silas", "Justus"], 
    answer: 0 
  },
  
  { 
    question: "According to Acts 5:17-18, which sect was filled with indignation and had the apostles put in prison?",
    options: ["The sect of the Pharisees", "The sect of the Sadducees", "The sect of the Zealots", "The sect of the Herodians"],
    answer: 1
  },
  
  { 
    question: "From which Cilician city was Saul from? (Acts 21:39)", 
    options: ["Antioch", "Tarsus", "Damascus", "Jerusalem"], 
    answer: 1 
  },

  { 
    question: "In which synagogue did Paul reason every Sabbath for three weeks, persuading some Jews and God-fearing Greeks? (Acts 17:1-4)", 
    options: ["Synagogue in Corinth", "Synagogue in Thessalonica", "Synagogue in Ephesus", "Synagogue in Athens"], 
    answer: 1 
  },
  
  { 
    question: "What exact question did the Ethiopian eunuch ask Philip while reading Isaiah? (Acts 8:34)", 
    options: ["Who is the prophet speaking about?", "Shall I be baptized?", "What must I do to be saved?", "Is Jesus the Messiah?"], 
    answer: 0 
  },
  
  { 
    question: "How many days was Saul blind after his encounter on the Damascus road? (Acts 9:9)", 
    options: ["3 days", "7 days", "40 days", "Until Ananias came"], 
    answer: 0 
  },
  
  { 
    question: "Which church sent Paul and Barnabas out as missionaries after prayer and fasting? (Acts 13:1-3)", 
    options: ["Church at Jerusalem", "Church at Antioch", "Church at Ephesus", "Church at Philippi"], 
    answer: 1 
  },
  
  { 
    question: "What was the first miracle performed by Paul on his missionary journey? (Acts 13:6-11)", 
    options: ["Healing a lame man", "Raising the dead", "Striking Elymas blind", "Exorcising a demon"], 
    answer: 2 
  },

  { 
    question: "According to Romans 16:1, what role did Phoebe hold in the church at Cenchreae?", 
    options: ["Deaconess", "Apostle", "Prophetess", "Evangelist"], 
    answer: 0 
  },
  
  { 
    question: "According to Acts 5:29, where is the verse found that states, 'We ought to obey God rather than men'?",
    options: ["Acts 4:19", "Acts 5:29", "Acts 6:1", "Acts 7:51"],
    answer: 1
  },
  
  { 
    question: "According to Acts 5:34, which Pharisee in the council was a doctor of the law who counseled restraint toward the apostles?",
    options: ["Gamaliel", "Nicodemus", "Joseph of Arimathaea", "Saul of Tarsus"],
    answer: 0
  },
  
  { 
    question: "Which church did Paul praise for their faith being reported all over the world? (Romans 1:8)", 
    options: ["Church in Ephesus", "Church in Rome", "Church in Corinth", "Church in Thessalonica"], 
    answer: 1 
  },
  
  { 
    question: "According to Acts 5:36, who did Gamaliel refer to as having boasted himself to be somebody, with about 400 followers who were all slain?",
    options: ["Barabbas", "Theudas", "Judas of Galilee", "Simon Magnus"],
    answer: 1
  },

  { 
    question: "What did the Bereans do daily to verify Paul’s teaching? (Acts 17:11)", 
    options: ["Prayed fervently", "Examined the Scriptures", "Spoke in tongues", "Gave generously"], 
    answer: 1 
  },
  
  { 
    question: "How many times did Paul appeal to Caesar during his trials?", 
    options: ["Once", "Twice", "Three times", "He never did"], 
    answer: 0 
  },
  
  { 
    question: "In Philippians 4:2, which two women did Paul urge to be of the same mind?", 
    options: ["Euodia and Syntyche", "Priscilla and Aquila", "Mary and Martha", "Lydia and Phoebe"], 
    answer: 0 
  },
  
  { 
    question: "What gift did Paul say he received from the Philippians while in Thessalonica? (Philippians 4:16)", 
    options: ["A cloak", "Financial support", "A letter of recommendation", "Books and parchments"], 
    answer: 1 
  },
  
  { 
    question: "According to Colossians 4:14, what was Luke’s profession?", 
    options: ["Tax collector", "Physician", "Tentmaker", "Fisherman"], 
    answer: 1 
  },

  { 
    question: "In 1 Thessalonians 4:16, what will accompany the Lord’s descent from heaven?", 
    options: ["A trumpet call", "Lightning and thunder", "Angels singing", "The sound of many waters"], 
    answer: 0 
},

  { 
    question: "Which church received Paul’s shortest letter?", 
    options: ["Galatians", "Philemon", "Titus", "2 Thessalonians"], 
    answer: 1 
  },

  { 
    question: "In Hebrews 11, who is described as having 'considered God faithful who had made the promise' regarding Sarah?", 
    options: ["Abraham", "Isaac", "Jacob", "Joseph"], 
    answer: 0 
  },

  { 
     question: "According to Gamaliel in Acts 5:37, who rose up after Theudas in the days of the taxing and drew away much people after him?",
    options: ["Judas of Galilee", "Barabbas", "The Egyptian", "Jesus of Nazareth"],
    answer: 0
  },

  { 
    question: "What warning does Jude give about certain men who 'crept in unnoticed'?", 
    options: ["They deny the Lord", "They are false teachers", "They are immoral", "All of the above"], 
    answer: 3 
  },

  { 
    question: "Who was the high priest that prophesied that one man should die for the people? (John 11:50)", 
    options: ["Annas", "Caiaphas", "Gamliel", "Nicodemus"], 
    answer: 1 
  },
  
  { 
    question: "Which miracle is recorded in all four Gospels?", 
    options: ["Feeding of the 5000", "Walking on water", "Raising Lazarus", "Healing the blind man"], 
    answer: 0 
  },
  
  { 
    question: "In which city did Paul preach from the Areopagus? (Acts 17:22)", 
    options: ["Corinth", "Athens", "Ephesus", "Philippi"], 
    answer: 1 
  },
  
  { 
    question: "What did Paul say he counted as loss compared to knowing Christ? (Philippians 3:8)", 
    options: ["His Roman citizenship", "His education under Gamaliel", "All things", "His tentmaking trade"], 
    answer: 2 
  },

  { 
    question: "According to Matthew 26:15, how many pieces of silver did Judas Iscariot receive for betraying Jesus?", 
    options: ["20", "30", "40", "50"], 
    answer: 1 
  },
  
  { 
    question: "Which woman was the first to see the risen Jesus and was told not to cling to Him? (John 20:17)", 
    options: ["Mary the mother of Jesus", "Mary Magdalene", "Mary of Bethany", "Salome"], 
    answer: 1 
  },
  
  { 
    question: "In Acts 5, what exact amount of money did Ananias and Sapphira keep back from the sale of their property?", 
    options: ["Part of the proceeds", "All of it", "Only the profit", "Nothing"], 
    answer: 0 
  },
  
  { 
    question: "Who fell out of a window while Paul was preaching in Troas and was raised from the dead? (Acts 20:9-12)", 
    options: ["Mnason", "Lyconia", "Eutychus", "Sopater"], 
    answer: 2 
  },
  
  { 
    question: "In Romans 16:3-5, who are described by Paul as his fellow workers in Christ Jesus and hosts of a house church?", 
    options: ["Aquila and Priscilla", "Timothy and Titus", "Barnabas and John Mark", "Silas and Luke"], 
    answer: 0 
  },

  { 
    question: "According to 1 Corinthians 1:14-16, whom did Paul personally baptize in Corinth?", 
    options: ["Crispus and Gaius", "Apollos and Cephas", "Aquila and Priscilla", "Stephanas and his household"], 
    answer: 3 
  },
  
  { 
    question: "According to Gamaliel's advice in Acts 5:38-39, what should the council do regarding the apostles' work?",
    options: ["Punish them severely as blasphemers", "Wait to see if their work was of God or of men", "Cast them out of the temple", "Force them to stop preaching"],
    answer: 1  
  },
  
  { 
    question: "Which church did Paul say he robbed other churches to serve? (2 Corinthians 11:8)", 
    options: ["Corinth", "Ephesus", "Thessalonica", "Philippi"], 
    answer: 3 
  },
  
  { 
    question: "In Galatians 3:28, Paul declares there is neither Jew nor Gentile, slave nor free, male nor female, for all are one in whom?", 
    options: ["The church", "Christ Jesus", "The Spirit", "The new covenant"], 
    answer: 1 
  },
  
  { 
    question: "According to Ephesians 6:5-8, how should servants (employees) obey their earthly masters?", 
    options: ["Only when watched", "With fear and trembling", "With sincerity of heart as to Christ", "Only if they are believers"], 
    answer: 2 
  },

  { 
    question: "Who was the runaway slave that Paul converted and sent back to his master Philemon?", 
    options: ["Epaphroditus", "Tychicus", "Onesimus", "Archippus"], 
    answer: 2
  },
  
  { 
    question: "In Hebrews 5:7, during the days of His flesh, Jesus offered up prayers with loud cries and tears to the One who could save Him from what?", 
    options: ["Roman rule", "Sin", "Death", "Betrayal"], 
    answer: 2
  },
  
  { 
    question: "According to James 5:17, how long did Elijah pray that it would not rain?", 
    options: ["Three and a half years", "Seven years", "Forty days", "One year"], 
    answer: 0 
  },
  
  { 
    question: "In 1 Peter 5:13, who does Peter refer to as 'she who is in Babylon, chosen together with you'?", 
    options: ["The church in Rome", "Mark’s mother", "His wife", "The elect lady"], 
    answer: 0 
  },

  { 
    question: "According to 2 Peter 2:15, which Old Testament prophet’s way did the false teachers follow for the sake of profit?", 
    options: ["Balaam son of Beor", "Jonah", "Elijah", "Isaiah"], 
    answer: 0 
  },
  
  { 
    question: "What does Revelation 1:18 say Jesus holds in His hands?", 
    options: ["The keys of death and Hades", "The seven stars", "The book of life", "The sharp double-edged sword"], 
    answer: 0 
  },
  
  { 
    question: "In Revelation 3:20, Jesus says He stands at the door and knocks. To whom is this message addressed?", 
    options: ["The church in Sardis", "The church in Laodicea", "The church in Philadelphia", "All seven churches"], 
    answer: 1 
  },
  
  { 
     question: "According to Acts 6:1, what was the complaint of the Grecians (Greek-speaking Jews) against the Hebrews?",
    options: ["Their widows were neglected in the daily ministration", "They were not allowed to pray in the temple", "They had to pay higher taxes", "They could not understand the Hebrew language"],
    answer: 0
  },

  { 
    question: "According to Revelation 7:4, how many were sealed from all the tribes of Israel?", 
    options: ["12,000", "144,000", "1,000,000", "7,000"], 
    answer: 1 
  },
  
  { 
    question: "What was written on the scroll that only the Lamb was worthy to open? (Revelation 5)", 
    options: ["The title deed of the earth", "Names of the redeemed", "The seven seals", "Judgments against Babylon"], 
    answer: 2 
  },
  
  { 
    question: "Which of the seven churches was warned that their lampstand would be removed if they did not repent? (Revelation 2:5)", 
    options: ["Smyrna", "Pergamum", "Ephesus", "Thyatira"], 
    answer: 2 
  },
  
  { 
    question: "According to Acts 18:2, why had Aquila and Priscilla recently come from Italy?", 
    options: ["They were missionaries", "Claudius had ordered all Jews to leave Rome", "They were fleeing persecution in Jerusalem", "They were sent by the apostles"], 
    answer: 1 
  },

  { 
    question: "In Luke 2:25, what was the name of the man in Jerusalem waiting for the consolation of Israel?", 
    options: ["Joseph", "Zacharias", "Simeon", "Nicodemus"], 
    answer: 2 
  },
  
  { 
    question: "According to John 4:18, how many husbands had the Samaritan woman at the well had before her current man?", 
    options: ["3", "10", "7", "5"], 
    answer: 3
  },
  
  { 
    question: "In Acts 19:19, what was the total value of the sorcery scrolls burned in Ephesus?", 
    options: ["50,000 drachmas", "30 pieces of silver", "100 talents of gold", "One million denarii"], 
    answer: 0 
  },
  
  { 
    question: "Which epistle contains the verse 'I can do all this through him who gives me strength'?", 
    options: ["Ephesians", "Philippians", "Colossians", "1 Thessalonians"], 
    answer: 1 
  },
  
  { 
    question: "In 2 Timothy 4:13, what items did Paul ask Timothy to bring?", 
    options: ["My cloak and books", "Coat and Sandals", "My scrolls and letters", "Books and parchments"], 
    answer: 3 
  },

  { 
    question: "Who was the only person in the Bible explicitly called 'a man after God’s own heart'?", 
    options: ["Abraham", "Moses", "David", "Paul"], 
    answer: 2 
  },
  
  { 
    question: "In which book does the phrase 'the just shall live by faith' first appear in the Old Testament?", 
    options: ["Psalms", "Proverbs", "Habakkuk", "Isaiah"], 
    answer: 2 
  },
  
  { 
    question: "What was the name of the high priest who tore his clothes when Jesus declared He was the Son of Man?", 
    options: ["Annas", "Joseph", "Gamliel", "Caiaphas"], 
    answer: 3 
  },
  
  { 
    question: "Which prophet was commanded by God to eat a scroll that tasted sweet as honey but made his stomach bitter?", 
    options: ["Jeremiah", "Nehemiah", "Daniel", "Ezekiel"], 
    answer: 3 
  },

  { 
    question: "Which single verse in the Bible is quoted more times in the New Testament than any other Old Testament verse?", 
    options: ["Psalm 110:1", "Isaiah 53:5", "Genesis 15:6", "Exodus 20:3"], 
    answer: 0 
  },

  { 
    question: "Which book of the Bible ends with these words: 'Even so, come, Lord Jesus'?", 
    options: ["Jude", "Revelation", "Hebrews", "2 Peter"], 
    answer: 1 
  },

  { 
    question: "According to Genesis 45:1, on which visit to Egypt did Joseph make himself known to his brethren?",
    options: ["Upon the first visit", "Upon the second visit", "Upon the third visit", "He never revealed himself"],
    answer: 1
  },
  
  { 
    question: "Where did Jesus say 'Peace I leave with you; my peace I give you'?", 
    options: ["Matthew 11", "John 14", "John 16", "Philippians 4"], 
    answer: 1 
  },
  
  { 
    question: "In which book and chapter is the story of the Philippian jailer’s conversion found?", 
    options: ["Acts 12", "Acts 16", "Acts 19", "Acts 28"], 
    answer: 1 
  },
  
  { 
    question: "Where does Paul write about the 'thorn in my flesh'?", 
    options: ["Galatians 4", "2 Corinthians 12", "1 Corinthians 12", "Colossians 4"], 
    answer: 1 
  },
  
  { 
    question: "Which chapter of Revelation describes the New Jerusalem coming down from heaven?", 
    options: ["Revelation 20", "Revelation 21", "Revelation 22", "Revelation 19"], 
    answer: 1 
  },

  { 
    question: "Which book and chapter contains the parable of the Prodigal Son?", 
    options: ["Matthew 18", "Luke 15", "Mark 12", "John 11"], 
    answer: 1 
  },
  
  { 
    question: "Where did Jesus raise Lazarus from the dead?", 
    options: ["Mark 5", "Matthew 11", "Luke 7", "John 11"], 
    answer: 3 
  },
  
  { 
    question: "In which chapter of Acts did the Holy Spirit come upon the disciples on the Day of Pentecost?", 
    options: ["Acts 1", "Acts 10", "Acts 4", "Acts 2"], 
    answer: 3 
  },
  
  { 
    question: "Where does the conversion of Saul (Paul) on the road to Damascus occur?", 
    options: ["Acts 7", "Acts 26", "Acts 22", "Acts 9"], 
    answer: 3
  },
  
  { 
    question: "In which book and chapter is the Jerusalem Council recorded?", 
    options: ["Acts 13", "Acts 15", "Galatians 2", "Romans 14"], 
    answer: 1 
  },

  { 
    question: "According to Deuteronomy, what was the punishment for a false witness?", 
    options: ["Exile", "Fines", "The same punishment he intended", "Public shaming"], 
    answer: 2 
  },
  
  { 
    question: "Which verse in Deuteronomy contains the command to 'love the Lord your God with all your heart and with all your soul and with all your strength'?", 
    options: ["Deuteronomy 4:6", "Deuteronomy 6:5", "Deuteronomy 10:12", "Deuteronomy 11:13"], 
    answer: 1 
  },
  
  { 
    question: "In the Old Testament, what was required if someone made a rash vow and could not fulfill it?", 
    options: ["They were put to death", "They had to bring a sin offering", "They were forgiven automatically", "They paid a heavy fine"], 
    answer: 1 
  },

  { 
    question: "Jesus criticized the Pharisees for tithing mint, dill, and cumin while neglecting what?", 
    options: ["The weightier matters of the law", "Temple sacrifices", "Prayer and fasting", "Sabbath observance"], 
    answer: 0 
  },
  
  { 
    question: "The Sadducees did not believe in which two important doctrines?", 
    options: ["Resurrection and angels", "Resurrection and judgment", "Angels and spirits", "All of the above"], 
    answer: 3 
  },

  { 
    question: "When the Pharisees asked Jesus about divorce, which book did He quote from to answer them?", 
    options: ["Deuteronomy", "Genesis", "Leviticus", "Exodus"], 
    answer: 1 
  },
  
  { 
    question: "Jesus called the Pharisees 'whitewashed tombs'. In which chapter of Matthew did He say this?", 
    options: ["Matthew 15", "Matthew 23", "Matthew 12", "Matthew 21"], 
    answer: 1 
  },
  
  { 
    question: "Paul stood trial before King Agrippa and made his defense in which chapter of Acts?", 
    options: ["Acts 24", "Acts 25", "Acts 26", "Acts 22"], 
    answer: 2 
  },

  { 
    question: "Paul was let down through a window in a basket to escape from which city?", 
    options: ["Jerusalem", "Damascus", "Antioch", "Ephesus"], 
    answer: 1 
  },

  { 
    question: "How many times did Paul mention being shipwrecked in 2 Corinthians 11?", 
    options: ["Once", "Three times", "Five times", "Seven times"], 
    answer: 1 
  },
  
  { 
    question: "In Revelation 2-3, which church was told they had a name of being alive but were actually dead?", 
    options: ["Sardis", "Laodicea", "Thyatira", "Pergamum"], 
    answer: 0 
  },

  { 
    question: "According to Genesis 45:16 and 50:7, during which visit did Joseph present his brethren to Pharaoh?",
    options: ["Upon the first visit", "Upon the second visit", "Upon the third visit", "They were never presented"],
    answer: 1
  },
  
  { 
    question: "Which New Testament book never mentions the word 'love'?", 
    options: ["2 John", "3 John", "Jude", "Philemon"], 
    answer: 1 
  },

  { 
    question: "In Acts 23, how many soldiers, horsemen, and spearmen did the commander send to escort Paul to Caesarea at night?", 
    options: ["200 soldiers, 70 horsemen, 200 spearmen", "470 soldiers, 70 horsemen", "1000 soldiers", "500 total"], 
    answer: 0 
  },
  
  { 
    question: "Which parable of Jesus is the only one that ends with the phrase 'Go and do likewise'?", 
    options: ["The Good Samaritan", "The Prodigal Son", "The Lost Sheep", "The Persistent Widow"], 
    answer: 0 
  },

  { 
    question: "According to Acts 7:2-50, which disciple delivered the full summary of Israel's history from Abraham to the prophets?",
    options: ["Peter", "Stephen", "Philip", "Paul"],
    answer: 1
  },
  
  { 
    question: "In Revelation 3:10, Jesus promises to keep the church of Philadelphia from what?", 
    options: ["Persecution", "The hour of trial coming on the whole world", "The mark of the beast", "The second death"], 
    answer: 1 
  },
  
  { 
    question: "Which Old Testament event is frequently seen as a type or picture of the Rapture ?", 
    options: ["Noah’s flood", "Enoch being taken", "Lot’s escape from Sodom", "Both B and C"], 
    answer: 3 
  },

  { 
    question: "According to Revelation 13, how many heads and horns does the Beast coming out of the sea have?", 
    options: ["7 heads and 10 horns", "10 heads and 7 horns", "4 heads and 10 horns", "1 head and 7 horns"], 
    answer: 0 
  },
  
  { 
    question: "What number is associated with the Beast in Revelation 13:18?", 
    options: ["616", "666", "777", "888"], 
    answer: 1 
  },
  
  { 
    question: "According to Acts 8:5, which of the seven deacons went down to the city of Samaria to preach Christ?",
    options: ["Stephen", "Philip", "Prochorus", "Nicanor"],
    answer: 1
  },
  
  { 
    question: "In Revelation 16, where is the place called in Hebrew 'Armageddon'?", 
    options: ["Valley of Jehoshaphat", "Mount of Olives", "Plain of Megiddo", "Valley of Hinnom"], 
    answer: 2 
  },
  
  { 
    question: "Which angel is described as having the key to the Abyss and binding Satan for 1000 years?", 
    options: ["Gabriel", "Michael", "An unnamed angel", "The Angel of the Lord"], 
    answer: 2 
  },

  { 
    question: "In Revelation 12, how many stars were in the crown on the head of the woman clothed with the sun?", 
    options: ["7", "10", "12", "24"], 
    answer: 2 
  },
  
  { 
    question: "What warning is given to those who worship the Beast and receive his mark?", 
    options: ["They will be thrown into the lake of fire", "They will be tormented with burning sulfur", "They will have no rest day or night", "All of the above"], 
    answer: 3 
  },
  
  { 
    question: "Which angel announces the fall of Babylon the Great in Revelation 18?", 
    options: ["The angel with the seven bowls", "Another angel coming down from heaven", "The angel standing in the sun", "Michael"], 
    answer: 1 
  },
  
  { 
    question: "In Revelation 19, who leads the armies of heaven riding on white horses following Christ?", 
    options: ["The 144,000", "The saints and angels", "The twenty-four elders", "The martyrs"], 
    answer: 1 
  },
  
  { 
    question: "What is written on the robe and thigh of the rider called Faithful and True in Revelation 19?", 
    options: ["King of kings and Lord of lords", "The Word of God", "Alpha and Omega", "Lion of Judah"], 
    answer: 0 
  },

  { 
    question: "Which angel is sent to measure the temple and the altar in Revelation 11?", 
    options: ["The angel with the little scroll", "A mighty angel", "The two witnesses", "None — John is told to measure it"], 
    answer: 3 
  },
  
  { 
    question: "In Revelation 14, what do the 144,000 have written on their foreheads?", 
    options: ["The mark of the Beast", "The name of the Father and the Lamb", "666", "A new name"], 
    answer: 1 
  },
  
  { 
    question: "What is the name of the great city that is spiritually called Sodom and Egypt, where the two witnesses are killed?", 
    options: ["Babylon", "Jerusalem", "Nineveh", "Rome"], 
    answer: 1 
  },
  
  { 
    question: "Which bowl judgment turns the rivers and springs of water into blood?", 
    options: ["The second", "The third", "The fourth", "The sixth"], 
    answer: 1 
  },
  
  { 
    question: "In Revelation 20, after the 1000 years, Satan is released and gathers nations for battle at what place?", 
    options: ["Armageddon", "Gog and Magog", "The Valley of Decision", "Megiddo"], 
    answer: 1 
  },

  { 
    question: "What warning is given three times in Revelation about adding to or taking away from the words of the prophecy?", 
    options: ["Revelation 1:3", "Revelation 22:18-19", "Revelation 3:3", "Revelation 14:9-10"], 
    answer: 1 
  },
  
  { 
    question: "Which angel shows John the New Jerusalem in Revelation 21?", 
    options: ["The angel with the seven plagues", "One of the seven angels who had the seven bowls", "Gabriel", "The angel standing in the sun"], 
    answer: 1 
  },

  { 
    question: "How many times does the phrase 'the rest of the acts of [king] are written in the book of the kings of Israel and Judah' appear in 2 Chronicles?", 
    options: ["8 times", "12 times", "15 times", "Over 20 times"], 
    answer: 3 
  },
  
  { 
    question: "Which king of Judah is described as doing what was right in the eyes of the Lord but not removing the high places?", 
    options: ["Asa", "Jehoshaphat", "Uzziah", "Jotham"], 
    answer: 3 
  },
  
  { 
    question: "Who said 'O Lord God of our fathers, are You not God in heaven, and do You not rule over all the kingdoms of the nations?'", 
    options: ["Hezekiah", "Josiah", "Jehoshaphat", "Asa"], 
    answer: 3 
  },
  
  { 
    question: "In 2 Chronicles, which king reigned for 52 years, the longest reign of any king of Judah?", 
    options: ["Hezekiah", "Josiah", "Manasseh", "Uzziah"], 
    answer: 3 
  },

  { 
    question: "Which wicked king of Judah sacrificed his own sons in the fire?", 
    options: ["Ahaz", "Amon", "Jehoiakim", "Manasseh"], 
    answer: 3 
  },
  
  { 
    question: "Who was the Cushite commander defeated by King Asa and the army of Judah?", 
    options: ["Zerah", "Shishak", "Tirhakah", "Sennacherib"], 
    answer: 3 
  },
  
  { 
    question: "Which king of Judah walked in the ways of David and removed the high places?", 
    options: ["Jehoshaphat", "Hezekiah", "Josiah", "Asa"], 
    answer: 3 
  },
  
  { 
    question: "Who was the prophetess that King Josiah sent to inquire of the Lord?", 
    options: ["Deborah", "Miriam", "Huldah", "Noadiah"], 
    answer: 3 
  },

  { 
    question: "Which king of Judah was carried to Babylon in bronze fetters?", 
    options: ["Jehoiachin", "Zedekiah", "Jehoiakim", "Manasseh"], 
    answer: 3 
  },
  
  { 
    question: "Who was the Levite that David appointed as chief musician along with Asaph?", 
    options: ["Heman", "Jeduthun", "Korah", "Ethan the Ezrahite"], 
    answer: 3 
  },
  
  { 
    question: "Which king of Judah did evil and burned incense in the high places?", 
    options: ["Jotham", "Ahaz", "Hezekiah", "Josiah"], 
    answer: 3 
  },
  
  { 
    question: "Who was the Ammonite king that made war against Jehoshaphat?", 
    options: ["Nahash", "Baalis", "Sanballat", "Ammon"], 
    answer: 3 
  },

  { 
    question: "In 2 Chronicles, which king is described as having a heart that was perfect toward God all his days?", 
    options: ["Hezekiah", "Josiah", "Jehoshaphat", "Asa"], 
    answer: 3 
  },
  
  { 
    question: "Who was the captain of the host that helped put Joash on the throne?", 
    options: ["Joab", "Abner", "Benaiah", "Jehoiada"], 
    answer: 3 
  },
  
  { 
    question: "Which king of Judah repaired the temple and paid the workers with money collected from the people?", 
    options: ["Manasseh", "Amon", "Jehoash", "Josiah"], 
    answer: 3 
  },
  
  { 
    question: "Who was the seer that rebuked King Uzziah for burning incense?", 
    options: ["Isaiah", "Jeremiah", "Zechariah", "Azariah the priest"], 
    answer: 3 
  },
  
  { 
    question: "Which king of Judah humbled himself when the prophet Isaiah warned him of coming judgment?", 
    options: ["Ahaz", "Manasseh", "Amon", "Hezekiah"], 
    answer: 3 
  },

  { 
    question: "What did Jonathan give David as a sign of their covenant of friendship?", 
    options: ["His sword", "His robe and armor", "His bow", "His horse"], 
    answer: 2 
  },
  
  { 
    question: "Where did David flee to escape from Saul and live among the Philistines?", 
    options: ["Hebron", "Ziklag", "Gath", "Jerusalem"], 
    answer: 2 
  },
  
  { 
    question: "Who was the Amalekite that claimed to have killed Saul?", 
    options: ["Doeg", "Agag", "The young man from Amalek", "Abner"], 
    answer: 2 
  },
  
  { 
    question: "In 2 Samuel 5, David captured which city and made it his capital?", 
    options: ["Hebron", "Jerusalem", "Bethlehem", "Zion"], 
    answer: 2 
  },

  { 
    question: "Who was the king of Gath that David fled to?", 
    options: ["Achish", "Achishh", "Akish", "Aachish"], 
    answer: 3 
  },

  { 
    question: "Who was the high priest during the time of David?", 
    options: ["Abiathar", "Abithar", "Abiather", "Abiaathar"], 
    answer: 3 
  },

  { 
    question: "Who advised Absalom to publicly take David's concubines?", 
    options: ["Ahithophel", "Aihthophel", "Aihtophel", "Ahitophel"], 
    answer: 0 
  },

  { 
    question: "Who was the priest that helped Joash become king as a child?", 
    options: ["Jehoiada", "Jehoiadah", "Jehoida", "Jehoiadda"], 
    answer: 0 
  },

  { 
    question: "Who was the silversmith in Ephesus who caused a riot against Paul?", 
    options: ["Demetrius", "Demetrious", "Demetrius", "Demetriuss"], 
    answer: 3 
  },

  { 
    question: "Who was the proconsul of Cyprus that Paul converted?", 
    options: ["Sergius Paulus", "Sergius Paul", "Sergius Paullus", "Sergius Paulus"], 
    answer: 3 
  },
  
  { 
    question: "What was the name of the sorcerer struck blind by Paul?", 
    options: ["Elymas", "Elymass", "Elimas", "Elymus"], 
    answer: 3 
  },

  { 
    question: "In which passage did Jesus give the two greatest commandments?", 
    options: ["Matthew 22:34-40", "Matthew 22:35-41", "Mark 12:28-34", "Luke 10:25-28"], 
    answer: 0 
 },

  
  { 
    question: "Where in the Bible do we find the verse 'For God so loved the world...'?", 
    options: ["John 3:14-16", "John 3:15-17", "John 3:16-18", "John 3:16"], 
    answer: 3 
  },

 { 
   question: "The Great Commission is found in which chapter?", 
   options: ["Matthew 26", "Matthew 27", "Matthew 28", "Mark 16"], 
   answer: 2 
 },

 { 
   question: "Where did Jesus say 'I am the way, the truth, and the life'?", 
   options: ["John 13:6", "John 14:4", "John 14:6", "John 15:1"], 
   answer: 2 
 },

 { 
   question: "The Lord's Prayer is recorded in which chapter of Matthew?", 
   options: ["Matthew 5", "Matthew 6", "Matthew 7", "Matthew 8"], 
   answer: 1 
 },

 { 
    question: 'The verse "If Satan drives out Satan, he is divided against himself" was spoken during which event?', 
    options: ["When healing the blind", "When accused of using Beelzebul", "During the Sermon on the Mount", "When feeding the 5000"], 
    answer: 1 
 },

 { 
    question: '"The Son of Man is Lord of the Sabbath" is recorded in which verse?', 
    options: ["Matthew 12:6", "Matthew 12:8", "Mark 2:28", "Luke 6:5"], 
    answer: 1 
 },

 { 
    question: 'In which verse did Jesus say "I am the way and the truth and the life. No one comes to the Father except through me"?', 
    options: ["John 13:6", "John 14:4", "John 14:6", "John 15:1"], 
    answer: 2 
 },

 { 
    question: 'What shall we say then? Shall we go on sinning so that grace may increase?', 
    options: ["Romans 5:20", "Romans 6:1", "Romans 6:15", "Romans 7:7"], 
    answer: 1 
 },

 { 
    question: 'The parable of the sower where some seed fell among thorns is found in which verse?', 
    options: ["Matthew 13:5", "Matthew 13:7", "Matthew 13:8", "Matthew 13:22"], 
    answer: 1 
 },

 { 
    question: '"Love the Lord your God with all your heart and with all your soul and with all your mind" is the first and greatest commandment. In which book?', 
    options: ["Exodus", "Leviticus", "Deuteronomy", "Matthew"], 
    answer: 3 
 },

 { 
    question: 'Where is the verse "I can do all this through him who gives me strength"?', 
    options: ["Philippians 4:11", "Philippians 4:12", "Philippians 4:13", "Ephesians 6:10"], 
    answer: 2 
 },

 { 
    question: '"For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God" is in which chapter?', 
    options: ["Romans 5", "Ephesians 1", "Ephesians 2", "Titus 3"], 
    answer: 2 
 },

 { 
    question: 'The "Love Chapter" (If I speak in the tongues of men or of angels...) is found in which book?', 
    options: ["Romans 12", "1 Corinthians 12", "1 Corinthians 13", "1 John 4"], 
    answer: 2 
 },

 { 
    question: '"Do not worry about tomorrow, for tomorrow will worry about itself" was said by Jesus in which chapter?', 
    options: ["Matthew 5", "Matthew 6", "Matthew 7", "Luke 12"], 
    answer: 1 
 },

 { 
    question: 'Where did the disciples first get called Christians?', 
    options: ["Jerusalem", "Antioch", "Rome", "Ephesus"], 
    answer: 1 
 },

 { 
    question: '"Faith without works is dead" is written in which chapter?', 
    options: ["James 1", "James 2", "Hebrews 11", "Galatians 5"], 
    answer: 1 
 },

 { 
    question: 'In which book does Paul say "I am not ashamed of the gospel, because it is the power of God..."?', 
    options: ["1 Corinthians", "Romans", "Galatians", "2 Timothy"], 
    answer: 1 
 },
              
  { 
    question: '"Do not store up for yourselves treasures on earth" was said by Jesus in which chapter?', 
    options: ["Matthew 5", "Matthew 6", "Matthew 7", "Luke 12"], 
    answer: 1 
  },

  { 
    question: '"Ask and it will be given to you; seek and you will find" is recorded in which chapter?', 
    options: ["Matthew 5", "Matthew 6", "Matthew 7", "John 14"], 
    answer: 2 
  },

  { 
    question: 'The verse "I am the bread of life" was spoken by Jesus in which chapter?', 
    options: ["John 4", "John 6", "John 8", "John 10"], 
    answer: 1 
  },

  { 
    question: '"I am the light of the world" is found in which chapter of John?', 
    options: ["John 6", "John 8", "John 9", "John 12"], 
    answer: 1 
  },

  { 
    question: 'Where is the verse "The thief comes only to steal and kill and destroy..."?', 
    options: ["John 8", "John 10", "John 12", "John 14"], 
    answer: 1 
  },

  { 
    question: '"Peace I leave with you; my peace I give you" was said by Jesus in which chapter?', 
    options: ["John 13", "John 14", "John 15", "John 16"], 
    answer: 1 
  },

  { 
    question: 'The verse "I am the resurrection and the life" was spoken to whom?', 
    options: ["Peter", "Martha", "Mary Magdalene", "Lazarus"], 
    answer: 1 
  },

  { 
    question: 'Where does Paul say "We walk by faith, not by sight"?', 
    options: ["Romans 8", "2 Corinthians 4", "2 Corinthians 5", "Hebrews 11"], 
    answer: 2 
  },

  { 
    question: '"All things work together for good" is found in which chapter?', 
    options: ["Romans 5", "Romans 8", "Romans 12", "Philippians 4"], 
    answer: 1 
  },

  { 
    question: 'The verse "If God is for us, who can be against us?" is in which chapter?', 
    options: ["Romans 5", "Romans 8", "Romans 12", "Ephesians 6"], 
    answer: 1 
  },

  { 
    question: 'Where is the verse "The wages of sin is death, but the gift of God is eternal life"?', 
    options: ["Romans 3", "Romans 5", "Romans 6", "Romans 8"], 
    answer: 2 
  },

  { 
    question: '"There is therefore now no condemnation for those who are in Christ Jesus" is in which chapter?', 
    options: ["Romans 5", "Romans 6", "Romans 7", "Romans 8"], 
    answer: 3 
  },

  { 
    question: 'In which chapter does Paul say "I have fought the good fight, I have finished the race"?', 
    options: ["1 Timothy 6", "2 Timothy 3", "2 Timothy 4", "Philippians 3"], 
    answer: 2 
  },

  { 
    question: 'The verse "The Lord is my shepherd, I shall not want" is from which book?', 
    options: ["Proverbs", "Psalms", "Isaiah", "Jeremiah"], 
    answer: 1 
  },

  { 
    question: '"Train up a child in the way he should go" is found in which book?', 
    options: ["Proverbs", "Psalms", "Ecclesiastes", "Deuteronomy"], 
    answer: 0 
  },

  { 
    question: 'Jesus said "You are the salt of the earth" and "You are the light of the world" during which major teaching?', 
    options: ["The Last Supper", "The Sermon on the Mount", "The Olivet Discourse", "The Upper Room Discourse"], 
    answer: 1 
  },

  { 
    question: 'In which context did Jesus say "Do not judge, or you too will be judged"?', 
    options: ["When healing on the Sabbath", "During the Sermon on the Mount", "While speaking to the Pharisees", "At the feeding of the 5000"], 
    answer: 1 
  },

  { 
    question: 'The parable of the Good Samaritan was told by Jesus in response to what question?', 
    options: ["Who is my neighbour?", "How can I inherit eternal life?", "What must I do to be saved?", "Who is the greatest in the kingdom?"], 
    answer: 0 
  },

  { 
    question: 'Jesus told the parable of the Prodigal Son while speaking to which group?', 
    options: ["His disciples", "The Pharisees and teachers of the law", "The crowd by the lake", "The Roman soldiers"], 
    answer: 1 
  },

  { 
    question: 'When Jesus said "It is easier for a camel to go through the eye of a needle than for someone who is rich to enter the kingdom of God", who was He speaking to?', 
    options: ["The Pharisees", "A rich young ruler", "His disciples", "The crowd"], 
    answer: 1 
  },

  { 
    question: 'The feeding of the 5000 took place after Jesus heard about the death of whom?', 
    options: ["John the Baptist", "Joseph", "Lazarus", "Herod"], 
    answer: 0 
  },

  { 
    question: 'In which context did Jesus say "Get behind me, Satan!" to Peter?', 
    options: ["After the Transfiguration", "After Peter confessed He was the Messiah", "During the Last Supper", "After the resurrection"], 
    answer: 1 
  },

  { 
    question: 'The verse "The truth will set you free" was spoken by Jesus during which discussion?', 
    options: ["With Nicodemus", "With the Samaritan woman", "With the Jews who believed in Him", "With Pilate"], 
    answer: 2 
  },

  { 
    question: 'Paul wrote "I have learned to be content whatever the circumstances" while in what situation?', 
    options: ["During house arrest in Rome", "In prison", "While on missionary journey", "After being shipwrecked"], 
    answer: 1 
  },

  { 
    question: 'The conversion of the Ethiopian eunuch took place while he was reading which prophet?', 
    options: ["Jeremiah", "Ezekiel", "Isaiah", "Daniel"], 
    answer: 2 
  },

  { 
    question: 'In which context did Jesus say "My kingdom is not of this world"?', 
    options: ["During the Sermon on the Mount", "When speaking to Pilate", "At the Last Supper", "While teaching in the temple"], 
    answer: 1 
  },

  { 
    question: 'The parable of the Lost Sheep, Lost Coin, and Prodigal Son were told together to answer what criticism?', 
    options: ["That Jesus ate with sinners", "That Jesus broke the Sabbath", "That Jesus claimed to be God", "That Jesus ignored the law"], 
    answer: 0 
  },

  { 
    question: 'Paul said "To live is Christ and to die is gain" in which letter?', 
    options: ["Romans", "Philippians", "Ephesians", "Colossians"], 
    answer: 1 
  },

  { 
    question: 'The verse "We know that in all things God works for the good of those who love him" was written in which context?', 
    options: ["Suffering and future glory", "Justification by faith", "Spiritual gifts", "The return of Christ"], 
    answer: 0 
  },

  { 
    question: 'Jesus washed the disciples’ feet during which event?', 
    options: ["The feeding of the 5000", "The Last Supper", "The Transfiguration", "After the resurrection"], 
    answer: 1 
  },

  { 
    question: 'The verse "The Lord is my shepherd, I shall not want" was written by David in which context?', 
    options: ["After killing Goliath", "During his flight from Saul", "As a reflection on God’s care", "After becoming king"], 
    answer: 2 
  },

  { 
    question: 'God told Moses "I AM WHO I AM" in which major event?', 
    options: ["Crossing the Red Sea", "At the burning bush", "On Mount Sinai", "During the plagues"], 
    answer: 1 
  },

  { 
    question: 'The parting of the Red Sea happened immediately after which event?', 
    options: ["The Passover", "The ten plagues", "The death of the firstborn", "Pharaoh chasing the Israelites"], 
    answer: 3 
  },

  { 
    question: 'Joshua commanded the sun and moon to stand still during the battle against which kings?', 
    options: ["The kings of Canaan", "The five Amorite kings", "The Philistines", "The Moabites"], 
    answer: 1 
  },

  { 
    question: 'David danced with all his might before the Lord while bringing what into Jerusalem?', 
    options: ["The Tabernacle", "The Ark of the Covenant", "The golden altar", "Solomon’s throne"], 
    answer: 1 
  },

  { 
    question: 'In 2 Chronicles 7, God appeared to Solomon at night after the dedication of what?', 
    options: ["The palace", "The temple", "The city walls", "The altar"], 
    answer: 1 
  },

  { 
    question: 'King Hezekiah prayed and God added 15 years to his life after he was told he would die. This happened during the invasion by which king?', 
    options: ["Sennacherib", "Nebuchadnezzar", "Shalmaneser", "Cyrus"], 
    answer: 0 
  },

  { 
    question: 'The verse "If my people, who are called by my name, will humble themselves..." was spoken in which context?', 
    options: ["To Moses at Sinai", "To Solomon after dedicating the temple", "To David after his sin", "To Josiah during revival"], 
    answer: 1 
  },

  { 
    question: 'In 2 Corinthians 12, Paul speaks about his "thorn in the flesh". What was his response to God’s answer?', 
    options: ["He complained bitterly", "He rejoiced in his weakness", "He asked three times", "He stopped praying"], 
    answer: 1 
  },

  { 
    question: 'Paul wrote "My grace is sufficient for you, for my power is made perfect in weakness" in which context?', 
    options: ["While in prison", "After his thorn in the flesh", "During a shipwreck", "When writing to the Romans"], 
    answer: 1 
  },

  { 
    question: 'The verse "We walk by faith, not by sight" was written by Paul in which situation?', 
    options: ["While facing death", "While encouraging the Corinthians", "During his first missionary journey", "After meeting the risen Christ"], 
    answer: 1 
  },

  { 
    question: 'In Ephesians 6, Paul describes the full armor of God in the context of what kind of battle?', 
    options: ["Physical war", "Against flesh and blood", "Spiritual warfare", "Against Roman soldiers"], 
    answer: 2 
  },

  {
    question: "According to Acts 9:33, at Lydda Peter healed a man named Aeneas who had been afflicted with what condition for eight years?",
    options: ["Blindness", "Deafness", "Palsy (paralysis)", "Leprosy"],
    answers: 2
  },

  {
    question: "According to Acts 9:36-41, whom did Peter raise from the dead in Joppa?",
    options: ["Lydia of Thyatira", "Dorcas (also called Tabitha)", "Mary the mother of Mark", "Priscilla"],
    answer: 1
  },

  {
    question: "In Acts 10:9-16, what kind of animal was specifically NOT included in the sheet let down from heaven?",
    options: ["Four-footed beasts", "Creeping things", "Fish of the sea", "Fowls of the air"],
    answer: 2
  },

  {
    question: "According to Acts 12:6-7, what fell from Peter's wrist when the angel smote him to awaken him in prison?",
    options: ["His crown of thorns", "His cloak", "His chains", "His sandals"],
    answer: 2
  },

  {
    question: "According to Acts 13:9, what other name is given for the sorcerer Elymas who withstood Paul?",
    options: ["Simon Magnus", "Bar-Jesus", "Atomos", "Demetrius"],
    answer: 1
  },

  {
    question: "According to Acts 14:8, at Lystra, what was the exact physical impairment of the man Paul perceived had faith to be healed?",
    options: ["He was blind from birth", "He was a cripple from his mother's womb", "He was deaf and had a speech impediment", "He was lame for 38 years"],
    answer: 1
  },

  {
    question: "According to Acts 15:10, what did Peter describe as a yoke upon the neck of the disciples which neither their fathers nor they were able to bear?",
    options: ["The law of Moses", "The traditions of the elders", "The temple tax", "The Sabbath restrictions"],
    answer: 0
  },

  {
    question: "According to Acts 15:20, which of these is NOT one of the four things James commanded the Gentiles to abstain from?",
    options: ["Pollutions of idols", "Fornication", "Eating unleavened bread", "Things strangled"],
    answer: 2
  },

  {
    question: "According to Acts 15:37-39, who was the young man that Paul refused to take with him, causing a sharp contention with Barnabas?",
    options: ["Titus", "Timothy", "John called Mark", "Luke"],
    answer: 2
  },

  {
    question: "According to Acts 17:23, what inscription did Paul see on the altar at Athens that he used as his starting point?",
    options: ["To the Unknown God", "To Zeus the Saviour", "To Athena the Wise", "To the Pantheon"],
    answer: 0
  },

  {
    question: "According to Acts 19:13-16, the seven sons of whom attempted to cast out an evil spirit using the name of Jesus Paul preached?",
    options: ["Annas the high priest", "Sceva, a Jew", "Caiaphas", "Gamaliel"],
    answer: 1
  },

  {
    question: "According to Exodus 17:12, who were the two men who held up Moses' hands during the battle with Amalek?",
    options: ["Joshua and Caleb", "Aaron and Hur", "Nadab and Abihu", "Eleazar and Ithamar"],
    answer: 1
  },

  {
    question: "According to Numbers 13:30, which spy among the twelve quieted the people and said, 'Let us go up at once and possess the land'?",
    answers: ["Joshua the son of Nun", "Caleb the son of Jephunneh", "Moses", "Aaron"],
    correct: 1
  },

  { 
    question: "What specific circumstance prompted God to place a mark on Cain after he killed Abel?", 
    options: ["Lest anyone finding him should kill him", "To identify him as the first murderer", "To curse his descendants", "To mark him as eternally damned"], 
    answer: 0 
  },

  { 
    question: "In which specific location was Abraham sitting when the three angels appeared to announce the birth of Isaac?", 
    options: ["By the oaks of Moreh", "By the terebinth trees of Mamre", "In the plains of Jordan", "By the well of Beer-sheba"], 
    answer: 1 
  },

  { 
    question: "What event was taking place when Lot's wife looked back and became a pillar of salt?", 
    options: ["The destruction of Sodom and Gomorrah", "The parting of the Red Sea", "The confusion of tongues at Babel", "Noah's flood waters receding"], 
    answer: 0 
  },

  { 
    question: "During which occasion did Jacob wrestle with the angel until the breaking of day?", 
    options: ["On the night before meeting Esau", "While fleeing from Laban", "When returning to Bethel", "During his vision of the ladder"], 
    answer: 0 
  },

  { 
    question: "What immediate circumstance led Joseph to reveal his identity to his brothers in Egypt?", 
    options: ["Pharaoh's command", "Judah's plea for Benjamin", "The end of the famine", "His brothers recognized him first"], 
    answer: 1 
  },

  { 
    question: "In what context did Joseph place his silver cup in Benjamin's sack?", 
    options: ["To punish them for selling him", "To test if they had changed", "To fulfill Pharaoh's dream", "To claim Benjamin as a slave"], 
    answer: 1 
  },

  // Exodus
  { 
    question: "What convinced Moses that the voice at the burning bush was God?", 
    options: ["The bush burned with fire but was not consumed", "A mighty wind split the mountain", "Lightning struck the ground", "The ground shook beneath his feet"], 
    answer: 0 
  },

  { 
    question: "During which plague did God protect the land of Goshen from the Egyptians?", 
    options: ["Plague of locusts", "Plague of flies", "Plague of darkness", "Plague of hail"], 
    answer: 1 
  },

  { 
    question: "What situation caused Moses to strike the rock twice, leading to his exclusion from Canaan?", 
    options: ["The people demanded meat", "The people demanded water", "The Amalekites attacked", "Aaron and Miriam challenged him"], 
    answer: 1 
  },

  { 
    question: "What triggered Moses to make a bronze serpent for healing the people?", 
    options: ["Fiery serpents bit the people", "They worshipped the golden calf", "They refused to cross the Jordan", "During the battle with the Amorites"], 
    answer: 0 
  },

  // Numbers & Deuteronomy
  { 
    question: "In what context did Balaam's donkey speak to him?", 
    options: ["When the donkey saw the angel with a drawn sword", "When they reached Mount Peor", "When Balak offered sacrifices", "When Balaam refused payment"], 
    answer: 0 
  },

  { 
    question: "What situation caused Moses to appoint judges to help him?", 
    options: ["Jethro saw him judging alone from morning till evening", "After Korah's rebellion", "When Eldad and Medad prophesied", "After the golden calf incident"], 
    answer: 0 
  },

  // Kings & Chronicles
  { 
    question: "What situation caused David to flee from Absalom into the wilderness?", 
    options: ["Absalom stole the hearts of Israel", "Absalom killed Amnon", "A prophet announced judgment", "The Philistines attacked"], 
    answer: 0 
  },

  { 
    question: "In what context did Solomon ask God for wisdom instead of riches?", 
    options: ["At Gibeon in a dream", "At the dedication of the temple", "When the Queen of Sheba visited", "While building the temple"], 
    answer: 0 
  },

  { 
    question: "What immediate event caused the kingdom to split after Solomon's death?", 
    options: ["Rehoboam refused to lighten the heavy yoke", "Solomon built high places for foreign gods", "Foreign invasion weakened the north", "Ahijah tore his garment"], 
    answer: 0 
  },

  { 
    question: "During which event did fire come down from heaven and consume Elijah's sacrifice?", 
    options: ["When Elijah called fire on the soaked sacrifice", "When he prayed to shut the heavens", "When he ascended in a whirlwind", "When he struck the Jordan"], 
    answer: 0 
  },

  // New Testament
  { 
    question: "In what setting did Jesus transfigure before Peter, James, and John?", 
    options: ["On a high mountain apart", "In Gethsemane", "On the Mount of Olives", "At the feeding of the 5000"], 
    answer: 0 
  },

  { 
    question: "What situation caused Jesus to weep over Jerusalem?", 
    options: ["He foresaw its destruction", "The Pharisees rejected Him", "His disciples failed to heal", "Lazarus had died"], 
    answer: 0 
  },

  { 
    question: "During which feast did Jesus cry out 'If anyone thirsts, let him come to me and drink'?", 
    options: ["Passover", "Tabernacles", "Dedication", "Weeks"], 
    answer: 1 
  },

  { 
    question: "What caused the disciples to wake Jesus during the storm on the lake?", 
    options: ["The boat was filling with water", "They saw a ghost on the water", "They caught no fish", "The Pharisees were chasing them"], 
    answer: 0 
  },

  {
    question: "In what context did Jesus curse the fig tree?", 
    options: ["It had no fruit though it was full of leaves", "It had withered from the roots", "It was planted in bad soil", "The Pharisees hid behind it"], 
    answer: 0 
  }
  
];

console.log(`✅ Questions.js loaded successfully with ${questions.length} questions`);
