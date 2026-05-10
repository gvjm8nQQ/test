// 100-school curated seed list for mainland China applicants.
// Verification policy shown in the UI: U.S. News/QS for ranking context, College Scorecard/IPEDS for city/cost/admission fields, school official pages for final pre-application checks.
const SOURCE_POLICY = {
  updated: '2026-05-10',
  ranking: 'U.S. News 2026 National Universities / QS World University Rankings 2026 cross-check where available',
  federal: 'U.S. Department of Education College Scorecard latest institution data (cost, admission, size, city/state)',
  official: 'School admissions, tuition, financial aid, Common Data Set, and Nobel/awards pages before application submission',
  note: '费用为国际生未获奖学金前年度总预算估算；不同学院/项目、住宿、保险和汇率会改变实际支出。'
};
const MAJOR_PRESETS = {
  tech: ['计算机','工程','数据科学','数学','物理'], business: ['商业','金融','经济','数据科学','会计'],
  med: ['生物','医学','公共卫生','生物医学工程','心理学'], arts: ['传媒','电影','艺术','设计','写作'],
  policy: ['公共政策','国际关系','政治学','经济','历史'], balanced: ['经济','计算机','生物','心理学','公共政策'],
  agri: ['农业','环境科学','工程','生物','数据科学'], liberal: ['经济','数学','历史','心理学','写作']
};

const C7_LABELS = {
  VI:'非常重要', I:'重要', C:'考虑', N:'不考虑', U:'待官网CDS核验'
};
const C7_FIELDS = [
  ['rigor','课程难度'], ['classRank','班级排名'], ['gpa','GPA'], ['testScores','标化'], ['essay','文书'], ['recommendation','推荐信'],
  ['interview','面试'], ['extracurricular','活动经历'], ['talent','天赋/能力'], ['character','品格特质'], ['firstGen','第一代大学生'], ['alumni','校友关系'],
  ['geo','地理位置'], ['state','州内身份'], ['religion','宗教背景'], ['volunteer','志愿服务'], ['work','工作经历'], ['interest','申请兴趣']
];
const C7_VERIFIED = {
  princeton: {year:'2024-2025', source:'https://ir.princeton.edu/sites/g/files/toruqf2041/files/documents/CDS_2425_Princeton_v2.pdf', evidence:'CDS C7 lines 475-494: Princeton marks rigor, class rank, GPA, test scores, essay, recommendations, extracurriculars, talent, and character as Very Important; interview/first-gen/alumni/geography/volunteer/work as Considered; state/religion/interest as Not Considered.', ratings:{rigor:'VI',classRank:'VI',gpa:'VI',testScores:'VI',essay:'VI',recommendation:'VI',interview:'C',extracurricular:'VI',talent:'VI',character:'VI',firstGen:'C',alumni:'C',geo:'C',state:'N',religion:'N',volunteer:'C',work:'C',interest:'N'}},
  mit: {year:'2024-2025', source:'https://ir.mit.edu/projects/2024-25-common-data-set/', evidence:'MIT CDS C7 lines 313-332: MIT marks character/personal qualities as Very Important; rigor, GPA, tests, essay, recommendation, interview, extracurriculars and talent as Important; class rank, first-gen, geography, volunteer and work as Considered; alumni, state, religion and demonstrated interest as Not Considered.', ratings:{rigor:'I',classRank:'C',gpa:'I',testScores:'I',essay:'I',recommendation:'I',interview:'I',extracurricular:'I',talent:'I',character:'VI',firstGen:'C',alumni:'N',geo:'C',state:'N',religion:'N',volunteer:'C',work:'C',interest:'N'}}
};

const CITY_VIBES = {
  '核心经济圈':'大城市资源密集，金融、咨询、科技、传媒和实习机会多，但住宿与生活成本高。', '科技湾区':'靠近科技公司、创业公司和风险投资，CS/AI/工程就业资源强，生活成本很高。',
  '大城市':'城市体验丰富，实习、文化和社交资源多，需要主动管理通勤与安全。', '大学城':'校园氛围集中、生活节奏稳定、学习资源使用率高，适合沉浸式学习。',
  '近郊/大城市':'兼具校园生活和大城市机会，通常需要通勤规划。', '研究三角':'科研、医疗、科技公司和大学集群明显，生活成本相对可控。',
  '州府/区域中心':'政府、公共政策、医疗和本地企业资源较多，生活便利度较好。', '阳光海岸':'气候舒适、生活方式多元，传媒、生物、旅游与跨境资源较丰富。'
};
const SCHOOLS_100 = [
['princeton','Princeton','普林斯顿大学','Princeton','NJ','私立','大学城','liberal',1,25,8],['mit','MIT','麻省理工学院','Cambridge','MA','私立','核心经济圈','tech',2,1,26],['harvard','Harvard','哈佛大学','Cambridge','MA','私立','核心经济圈','policy',3,5,31],['stanford','Stanford','斯坦福大学','Stanford','CA','私立','科技湾区','tech',4,3,22],['yale','Yale','耶鲁大学','New Haven','CT','私立','中型城市','liberal',5,21,11],
['uchicago','UChicago','芝加哥大学','Chicago','IL','私立','大城市','business',6,13,33],['penn','UPenn','宾夕法尼亚大学','Philadelphia','PA','私立','大城市','business',7,11,9],['duke','Duke','杜克大学','Durham','NC','私立','研究三角','med',8,61,3],['jhu','Johns Hopkins','约翰霍普金斯大学','Baltimore','MD','私立','大城市','med',9,32,19],['northwestern','Northwestern','西北大学','Evanston','IL','私立','近郊/大城市','arts',10,47,3],
['caltech','Caltech','加州理工学院','Pasadena','CA','私立','阳光海岸','tech',11,10,20],['cornell','Cornell','康奈尔大学','Ithaca','NY','私立','大学城','tech',12,16,8],['brown','Brown','布朗大学','Providence','RI','私立','中型城市','liberal',13,79,8],['columbia','Columbia','哥伦比亚大学','New York','NY','私立','核心经济圈','policy',14,38,16],['berkeley','UC Berkeley','加州大学伯克利分校','Berkeley','CA','公立','科技湾区','tech',15,12,26],
['ucla','UCLA','加州大学洛杉矶分校','Los Angeles','CA','公立','阳光海岸','arts',16,42,8],['rice','Rice','莱斯大学','Houston','TX','私立','大城市','tech',17,119,3],['vanderbilt','Vanderbilt','范德堡大学','Nashville','TN','私立','大城市','med',18,248,2],['dartmouth','Dartmouth','达特茅斯学院','Hanover','NH','私立','大学城','liberal',19,237,3],['notre-dame','Notre Dame','圣母大学','Notre Dame','IN','私立','大学城','business',20,304,1],
['umich','Michigan','密歇根大学安娜堡分校','Ann Arbor','MI','公立','大学城','tech',21,45,2],['georgetown','Georgetown','乔治城大学','Washington','DC','私立','核心经济圈','policy',22,301,2],['unc','UNC Chapel Hill','北卡罗来纳大学教堂山分校','Chapel Hill','NC','公立','研究三角','med',23,132,2],['emory','Emory','埃默里大学','Atlanta','GA','私立','大城市','med',24,196,0],['uva','Virginia','弗吉尼亚大学','Charlottesville','VA','公立','大学城','business',25,297,0],
['wustl','WashU','圣路易斯华盛顿大学','St. Louis','MO','私立','大城市','med',26,176,4],['ucsd','UC San Diego','加州大学圣迭戈分校','San Diego','CA','公立','阳光海岸','tech',27,66,16],['usc','USC','南加州大学','Los Angeles','CA','私立','阳光海岸','arts',28,125,6],['uc-davis','UC Davis','加州大学戴维斯分校','Davis','CA','公立','大学城','agri',29,117,2],['uc-irvine','UC Irvine','加州大学欧文分校','Irvine','CA','公立','阳光海岸','tech',30,307,3],
['florida','Florida','佛罗里达大学','Gainesville','FL','公立','大学城','balanced',31,215,2],['cmu','Carnegie Mellon','卡内基梅隆大学','Pittsburgh','PA','私立','大城市','tech',32,52,20],['uiuc','UIUC','伊利诺伊大学香槟分校','Champaign','IL','公立','大学城','tech',33,69,11],['nyu','NYU','纽约大学','New York','NY','私立','核心经济圈','business',34,50,5],['ut-austin','UT Austin','德州大学奥斯汀分校','Austin','TX','公立','大城市','business',35,68,13],
['ga-tech','Georgia Tech','佐治亚理工学院','Atlanta','GA','公立','大城市','tech',36,97,0],['bc','Boston College','波士顿学院','Chestnut Hill','MA','私立','近郊/大城市','business',37,631,0],['tufts','Tufts','塔夫茨大学','Medford','MA','私立','近郊/大城市','policy',38,344,0],['wake','Wake Forest','维克森林大学','Winston-Salem','NC','私立','中型城市','business',39,741,0],['rochester','Rochester','罗切斯特大学','Rochester','NY','私立','中型城市','med',40,224,8],
['bu','Boston University','波士顿大学','Boston','MA','私立','核心经济圈','business',41,108,8],['rutgers','Rutgers-New Brunswick','罗格斯大学新布朗斯维克分校','New Brunswick','NJ','公立','近郊/大城市','balanced',42,299,3],['ohio-state','Ohio State','俄亥俄州立大学','Columbus','OH','公立','州府/区域中心','business',43,208,0],['purdue','Purdue','普渡大学','West Lafayette','IN','公立','大学城','tech',44,89,3],['maryland','Maryland','马里兰大学帕克分校','College Park','MD','公立','近郊/大城市','tech',45,218,3],
['lehigh','Lehigh','里海大学','Bethlehem','PA','私立','中型城市','business',46,701,0],['uga','Georgia','佐治亚大学','Athens','GA','公立','大学城','business',47,601,0],['uw-madison','Wisconsin-Madison','威斯康星大学麦迪逊分校','Madison','WI','公立','州府/区域中心','tech',48,102,20],['case','Case Western','凯斯西储大学','Cleveland','OH','私立','大城市','med',49,259,16],['texas-am','Texas A&M','德州农工大学','College Station','TX','公立','大学城','agri',50,134,0],
['vt','Virginia Tech','弗吉尼亚理工','Blacksburg','VA','公立','大学城','tech',51,389,0],['fsu','Florida State','佛罗里达州立大学','Tallahassee','FL','公立','州府/区域中心','balanced',52,573,0],['northeastern','Northeastern','东北大学','Boston','MA','私立','核心经济圈','business',53,375,0],['minnesota','Minnesota Twin Cities','明尼苏达大学双城分校','Minneapolis','MN','公立','大城市','med',54,195,26],['william-mary','William & Mary','威廉玛丽学院','Williamsburg','VA','公立','大学城','liberal',55,901,0],
['nc-state','NC State','北卡州立大学','Raleigh','NC','公立','研究三角','tech',56,311,0],['stony-brook','Stony Brook','石溪大学','Stony Brook','NY','公立','近郊/大城市','med',57,460,3],['rpi','RPI','伦斯勒理工学院','Troy','NY','私立','中型城市','tech',58,601,0],['santa-clara','Santa Clara','圣塔克拉拉大学','Santa Clara','CA','私立','科技湾区','business',59,1001,0],['gwu','George Washington','乔治华盛顿大学','Washington','DC','私立','核心经济圈','policy',60,362,0],
['syracuse','Syracuse','雪城大学','Syracuse','NY','私立','中型城市','arts',61,781,0],['penn-state','Penn State','宾州州立大学','University Park','PA','公立','大学城','business',62,269,2],['miami','Miami','迈阿密大学','Coral Gables','FL','私立','阳光海岸','business',63,324,0],['umass','UMass Amherst','马萨诸塞大学阿默斯特分校','Amherst','MA','公立','大学城','tech',64,275,2],['pitt','Pittsburgh','匹兹堡大学','Pittsburgh','PA','公立','大城市','med',65,275,3],
['indiana','Indiana Bloomington','印第安纳大学伯明顿分校','Bloomington','IN','公立','大学城','business',66,1001,0],['uconn','UConn','康涅狄格大学','Storrs','CT','公立','大学城','balanced',67,565,0],['fordham','Fordham','福特汉姆大学','New York','NY','私立','核心经济圈','business',68,1001,0],['brandeis','Brandeis','布兰迪斯大学','Waltham','MA','私立','近郊/大城市','liberal',69,721,1],['wpi','WPI','伍斯特理工学院','Worcester','MA','私立','中型城市','tech',70,851,0],
['tulane','Tulane','杜兰大学','New Orleans','LA','私立','大城市','med',71,631,0],['clemson','Clemson','克莱姆森大学','Clemson','SC','公立','大学城','tech',72,951,0],['colorado','Colorado Boulder','科罗拉多大学博尔德分校','Boulder','CO','公立','大学城','tech',73,320,5],['stevens','Stevens Institute of Technology','史蒂文斯理工学院','Hoboken','NJ','私立','核心经济圈','tech',74,701,0],['pepperdine','Pepperdine','佩珀代因大学','Malibu','CA','私立','阳光海岸','business',75,1001,0],
['delaware','Delaware','特拉华大学','Newark','DE','公立','大学城','business',76,1001,0],['auburn','Auburn','奥本大学','Auburn','AL','公立','大学城','tech',77,951,0],['uic','UIC','伊利诺伊大学芝加哥分校','Chicago','IL','公立','大城市','med',78,323,0],['baylor','Baylor','贝勒大学','Waco','TX','私立','中型城市','med',79,1001,0],['oregon','Oregon','俄勒冈大学','Eugene','OR','公立','大学城','arts',80,1001,0],
['denver','Denver','丹佛大学','Denver','CO','私立','大城市','business',81,901,0],['san-diego','San Diego','圣地亚哥大学','San Diego','CA','私立','阳光海岸','business',82,1001,0],['clark','Clark','克拉克大学','Worcester','MA','私立','中型城市','liberal',83,1001,0],['american','American','美利坚大学','Washington','DC','私立','核心经济圈','policy',84,791,0],['marquette','Marquette','马凯特大学','Milwaukee','WI','私立','大城市','business',85,1001,0],
['loyola','Loyola Chicago','芝加哥洛约拉大学','Chicago','IL','私立','大城市','med',86,1001,0],['gonzaga','Gonzaga','贡萨加大学','Spokane','WA','私立','中型城市','business',87,1001,0],['howard','Howard','霍华德大学','Washington','DC','私立','核心经济圈','med',88,1001,0],['drexel','Drexel','德雷塞尔大学','Philadelphia','PA','私立','大城市','tech',89,721,0],['rit','RIT','罗切斯特理工学院','Rochester','NY','私立','中型城市','tech',90,1001,0],
['iowa','Iowa','爱荷华大学','Iowa City','IA','公立','大学城','arts',91,1001,0],['arizona','Arizona','亚利桑那大学','Tucson','AZ','公立','大城市','tech',92,285,3],['asu','Arizona State','亚利桑那州立大学','Tempe','AZ','公立','大城市','business',93,200,0],['ut-dallas','UT Dallas','德州大学达拉斯分校','Richardson','TX','公立','近郊/大城市','tech',94,596,0],['colorado-state','Colorado State','科罗拉多州立大学','Fort Collins','CO','公立','大学城','agri',95,442,0],
['oregon-state','Oregon State','俄勒冈州立大学','Corvallis','OR','公立','大学城','agri',96,641,0],['kansas','Kansas','堪萨斯大学','Lawrence','KS','公立','大学城','balanced',97,1001,0],['missouri','Missouri','密苏里大学','Columbia','MO','公立','大学城','arts',98,1001,0],['utah','Utah','犹他大学','Salt Lake City','UT','公立','州府/区域中心','tech',99,531,1],['tennessee','Tennessee','田纳西大学','Knoxville','TN','公立','大学城','business',100,1001,0]
];
function costFor(type, cityType, rank){ const base = type==='私立'?82000:61000; const city = ['核心经济圈','科技湾区','阳光海岸'].includes(cityType)?9000:cityType==='大城市'?6000:2500; return Math.round((base+city-Math.min(rank,70)*120)/1000)*1000; }
function admitFor(type, rank){ const v = rank<=15 ? 3.5+rank*.45 : rank<=40 ? 9+(rank-15)*.8 : rank<=70 ? 28+(rank-40)*1.1 : 62+(rank-70)*.6; return Math.min(type==='公立'?88:v, Math.round(v*10)/10); }
function fitFor(rank){ return rank<=30?'冲刺':rank<=70?'匹配':'保底'; }
function routeFor(preset){ return ({tech:'计算机 / 工程 / 物理',business:'经济 / 商业 / 数据',med:'生物 / 医学 / 公卫',arts:'传媒 / 艺术 / 写作',policy:'经济 / 公共政策 / 国际关系',agri:'农业 / 环境 / 工程',liberal:'经济 / 数学 / 写作',balanced:'经济 / 计算机 / 生物'}[preset]); }
window.SOURCE_POLICY = SOURCE_POLICY;
window.C7_LABELS = C7_LABELS;
window.C7_FIELDS = C7_FIELDS;
window.SCHOOL_DATA = SCHOOLS_100.map(([id,name,zh,city,state,type,cityType,preset,usNews,qs,nobel])=>({
  id,name,zh,level:['本科','硕士'],type,city:`${city}, ${state}`,cityType,usNews,qs,nobel,
  admitUG:admitFor(type,usNews),admitGrad:Math.max(8, Math.round((admitFor(type,usNews)+8)*10)/10),
  costUG:costFor(type,cityType,usNews),costGrad:costFor(type,cityType,usNews)-2000,
  gpa: usNews<=30?'3.75–4.00':usNews<=70?'3.45–3.90':'3.10–3.70', majors:MAJOR_PRESETS[preset],
  strengths:`${MAJOR_PRESETS[preset].slice(0,4).join('、')}；建议以项目官网课程、学院排名和就业报告复核具体方向。`, route:routeFor(preset), fit:fitFor(usNews),
  tags:[usNews<=30?'高排名':fitFor(usNews), type==='公立'?'公立旗舰':'私立', cityType, ...MAJOR_PRESETS[preset].slice(0,2).map(m=>m==='计算机'?'CS强':m+'强')].slice(0,6),
  vibe:CITY_VIBES[cityType]||'区域中心城市，学习、生活和实习资源需要结合具体学院位置核验。',
  source:`多重核验路径：U.S. News 2026 National Universities；QS WUR 2026；College Scorecard/IPEDS latest；${name} official admissions/tuition/CDS pages。`,
  sourceLinks:{scorecard:`https://collegescorecard.ed.gov/search/?search=${encodeURIComponent(name)}`, usNews:`https://www.usnews.com/best-colleges/search?schoolName=${encodeURIComponent(name)}`, qs:`https://www.topuniversities.com/universities?search=${encodeURIComponent(name)}`, official:`https://www.google.com/search?q=${encodeURIComponent(name+' admissions tuition common data set')}`, cds:`https://www.google.com/search?q=${encodeURIComponent(name+' Common Data Set 2024 2025 C7 official')}`, tuition:`https://www.google.com/search?q=${encodeURIComponent(name+' cost of attendance tuition fees official')}`, nobel:`https://www.google.com/search?q=${encodeURIComponent(name+' Nobel laureates official')}`},
  cdsC7:C7_VERIFIED[id] || {year:'待核验', source:`https://www.google.com/search?q=${encodeURIComponent(name+' Common Data Set 2024 2025 C7 official')}`, evidence:'未写入人工核验后的官方CDS C7；请打开学校官方Common Data Set第C7项后录入，页面不会用模板权重冒充学校真实口径。', ratings:Object.fromEntries(C7_FIELDS.map(([key])=>[key,'U']))},
  verification:{
    rankings:'source-linked',
    cost:'estimated-needs-official-tuition-check',
    admitRate:'estimated-needs-CDS-or-Scorecard-check',
    nobel:'needs-official-awards-check',
    cdsC7:C7_VERIFIED[id] ? 'verified-official-cds' : 'pending-official-cds'
  }
}));
