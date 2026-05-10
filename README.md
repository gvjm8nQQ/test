# 美本/美研选校雷达（大陆学生版）

## 怎么看这个页面

这是一个纯静态网页，不需要安装依赖。你可以在仓库根目录运行：

```bash
python3 -m http.server 4173
```

然后用浏览器打开：

```text
http://127.0.0.1:4173/
```

如果你直接双击 `index.html`，多数浏览器也可以打开，但推荐用本地服务器方式，和上线后的行为更接近。

## 现在包含什么

- 100 所美国学校数据，覆盖本科和硕士初筛。
- 学校排名、QS 参考、强势专业、年度费用估算、录取率估算、城市类型、城市画像、诺奖关联数量、GPA 参考区间。
- 专业、城市、学校属性、申请定位、GPA、预算、快速标签筛选。
- 按排名、费用、录取率排序。
- 多校对比表。
- 学校详情弹窗：申请权重、GPA 判断、申请建议、费用/排名/诺奖口径、核验来源链接。

## 数据准确性和核验方式

留学数据每年都会变，尤其是费用、录取率、项目要求和排名。因此页面将每所学校的数据拆成「展示值 + 核验来源」。最终申请前应按下面顺序复核：

1. 学校官网 Admissions / Tuition / Financial Aid / Common Data Set。
2. U.S. Department of Education College Scorecard / IPEDS。
3. U.S. News 2026 National Universities。
4. QS World University Rankings 2026。
5. 学校 Nobel / Awards / Facts 页面。

> 页面中的年度费用为国际生未获奖学金前总预算估算，不等于实际净价；硕士费用还会因学院、项目长度和学分数发生变化。

## CDS C7 录取因素怎么处理

你提到的“学校对学生几个维度的看法”对应 Common Data Set 的 **C7: Basis for Selection**。这个表会把课程难度、GPA、标化、文书、推荐信、面试、活动、天赋、品格、第一代大学生、校友关系、地理位置、州内身份、宗教、志愿服务、工作经历、申请兴趣等维度标为：Very Important / Important / Considered / Not Considered。

为避免把模板数据冒充学校真实数据，页面现在采用以下规则：

- 已人工核验官方 CDS C7 的学校，显示学校自己的 C7 权重和官方来源链接。
- 未人工核验的学校，显示“待官网 CDS 核验”，并提供官方 CDS C7 检索入口；不会再用统一模板条形图假装每个学校口径相同。
- 目前已录入官方 C7 的示例包括 Princeton 2024-2025 与 MIT 2024-2025；继续补全 100 所时，只需要在 `data.js` 的 `C7_VERIFIED` 中追加学校 ID、年份、官方链接、证据说明和 18 个维度评级。

## 批量核验矩阵

仓库现在包含 `scripts/build-verification-report.mjs`，用于把 100 所学校逐校展开成 `verification-report.csv`。这个 CSV 会列出每所学校的：

- CDS C7 核验状态、CDS 年份、CDS 来源链接。
- 本科费用、录取率、诺奖字段的核验状态。
- 费用官网检索、诺奖官网检索、College Scorecard 检索入口。

运行方式：

```bash
node scripts/build-verification-report.mjs
```

注意：目前没有把估算字段标成“已核验”。如果费用、录取率、诺奖、CDS C7 没有人工打开官方页面并录入证据，页面和 CSV 都会显示待核验状态，避免误导申请者。
