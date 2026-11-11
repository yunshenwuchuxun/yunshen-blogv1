# 搜索收录与数据采集

搜索收录、搜索表现和站内访问是三类独立数据。网站部署并通过站点所有权验证后，才能在相应平台查看数据；本地预览不能代替正式站点的验证或提交。

| 要了解的内容 | 使用的平台 | 主要数据 |
| --- | --- | --- |
| 搜索引擎是否找到、抓取和索引页面 | Google Search Console / Bing Webmaster Tools | 网页索引编制、URL Inspection、抓取错误、sitemap 状态 |
| 用户如何从搜索中找到网站 | Google Search Console / Bing Webmaster Tools | 搜索词、展示、点击、CTR、平均排名 |
| 进入网站后访问了什么 | Vercel Analytics / Google Analytics 4 | 页面浏览、来源、事件与访问路径 |
| 页面实际体验 | Vercel Speed Insights | 真实用户性能指标 |

已有 Vercel Analytics 和 Speed Insights 组件继续保留。GA4 为可选集成，不替代搜索引擎的索引报告。

如果先查看访问量和来源，在 Vercel 控制台选择该项目，进入 Analytics 并点击 Enable；首次启用后重新部署，再访问正式网站，随后到同一面板查看数据。代码中的 Analytics 组件已经接入。[Vercel Web Analytics 官方入门](https://vercel.com/docs/analytics/quickstart)。

## 1. 确定正式域名并部署

复制 `.env.example` 为本地环境文件，或在部署平台设置对应变量。`NEXT_PUBLIC_SITE_URL` 默认采用现有正式地址 `https://uestc.de5.net`，只接受 HTTP(S) origin，例如域名和可选端口，不包含子路径、查询参数、凭据或 fragment。

该配置统一 canonical、Open Graph URL、robots.txt、sitemap 和 RSS 的绝对地址。改用其他正式域名时，先完成域名绑定，再修改配置并重新部署。旧域名若仍对外服务，应在部署平台配置到正式域名的重定向。

部署后检查：

- `/robots.txt` 返回 200，并指向同域名的 `/sitemap.xml`。
- `/sitemap.xml` 返回 XML，只包含公开、有效的规范 URL。
- `/feed.xml` 返回 RSS XML，包含已发布中文文章的真实链接。
- 页面源码中 canonical 使用正式域名，中文站点的语言标记为 `zh-Hans`。
- 重要项目页、文章页与标签页返回 200；不存在的内容返回 404。

sitemap 覆盖首页、Blog、Projects、About、Tags、项目详情、标签详情和已发布文章，保留当前中文站点的原有路径。草稿不进入 sitemap 和 RSS。

没有可靠内容更新时间时省略 `lastmod`，不把每次构建日期冒充内容更新。Google 会参考持续准确的更新时间；提交 sitemap 也不保证全部收录。[Sitemap 官方说明](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。

## 2. Google Search Console

1. 打开 [Google Search Console](https://search.google.com/search-console)，添加正式站点。
2. 能控制 DNS 时使用 Domain property，并添加平台提供的 DNS verification。无法修改 DNS 时可使用 URL-prefix property 和 HTML meta verification。
3. 选择 HTML meta 方法时，把 `google-site-verification` 标签的 `content` 值填入 `GOOGLE_SITE_VERIFICATION`，部署后回到 Search Console 完成验证。使用 DNS 验证则不必设置这个环境变量。
4. 在 Sitemaps 中提交正式站点的 `/sitemap.xml`。
5. 用 URL Inspection 检查首页及少数重要页面，必要时选择 Request indexing。
6. 在「网页索引编制」查看收录与未收录原因；在「效果」查看搜索词、展示和点击。

抓取和索引需要时间，请以 URL Inspection 和报告结果为准。请求抓取不等于已收录，不需要反复提交相同 URL。普通博客不适用 Google Indexing API；该 API 的适用内容是 JobPosting，或 VideoObject 中的 BroadcastEvent。[所有权验证](https://support.google.com/webmasters/answer/9008080?hl=zh-Hans)、[请求重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)、[Indexing API 适用范围](https://developers.google.com/search/apis/indexing-api/v3/using-api)。

## 3. Bing Webmaster Tools

1. 打开 [Bing Webmaster Tools](https://www.bing.com/webmasters)。已有验证通过的 GSC 属性时，可以直接导入；也可以单独添加并验证正式域名。
2. 使用 HTML meta 方法时，将 `msvalidate.01` 的 `content` 值填入 `BING_SITE_VERIFICATION`，部署后完成验证。也可使用 Bing 提供的 DNS 或文件验证方式。
3. 提交同一个 `/sitemap.xml`，在 Sitemaps 查看读取结果，在 URL Inspection / Site Explorer 排查页面问题。
4. 验证后等待报告开始累计，再看搜索表现；没有展示或点击时，不代表追踪脚本故障。

IndexNow 可作为后续的更新通知渠道：生成 key，把 UTF-8 key 文件发布到正式站点，随后提交新建、更新或删除的 URL。当前代码没有自动向外部搜索引擎提交 URL，也没有生成或宣称启用了 IndexNow。提交接收不等于页面已经索引。[添加与验证站点](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)、[Bing Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)、[IndexNow 接入](https://www.bing.com/indexnow/getstarted)。

## 4. GA4 访问采集

1. 在 [Google Analytics](https://analytics.google.com) 创建 GA4 property 和 Web data stream，填写正式站点地址。
2. 将该流的 Measurement ID 填入 `NEXT_PUBLIC_GA4_MEASUREMENT_ID`。组件仅接受有效的 `G-` ID；留空或无效时不插入 Google 脚本。
3. **本项目使用手动 page_view 模式。** 到 Web data stream → Enhanced measurement → Page views → Advanced settings，关闭 **Page changes based on browser history events**。不要再通过 GTM 或另一个组件为同一 Measurement ID 重复添加页面浏览追踪。
4. 重新部署，在 GA4 Realtime / DebugView 或 [Google Tag Assistant](https://tagassistant.google.com) 中验证首屏和站内切换。

`GoogleAnalytics` 使用 `next/script` 的 `afterInteractive` 加载。脚本 ready 后以 `send_page_view: false` 初始化，并手动发送一次首屏事件。随后按 `usePathname()` 监听页面变化；记录当前 URL、标题和上一页地址，相同 URL 的重复 effect 不会重复发送。当前博客不把仅 query 或 hash 的变化视为一个新页面，不监听这些变化来增加虚拟浏览量。

`send_page_view: false` 只关闭 config 产生的首屏事件，不能代替 GA4 后台关闭 history 自动采集的设置。Google 文档明确说明，两者同时启用会造成重复页面浏览。[GA4 page_view 官方说明](https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag)、[SPA 测量](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)。

根布局已在生产环境分析区域集成一次 `GoogleAnalytics`，无需再次修改代码或重复添加 Google tag。没有有效 Measurement ID 时不加载 Google 脚本；配置 ID 并重新部署后才会启用。

Measurement ID 是公开的网页标识，不是 Google 账号密码或 API secret。环境变量修改后需要重新部署。首次配置可先使用 Realtime 验证，再等待正式报告处理；不能凭“脚本存在”就认定数据已经进入指定账户。[GA4 设置与验证](https://support.google.com/analytics/answer/14183469?hl=zh-Hans)。

## 5. 当前核验边界

2026-11-11 已通过用户登录的 Edge 原生控制台完成以下操作：

- Google Search Console 的 URL-prefix property 为 `https://uestc.de5.net/`，HTML 文件所有权验证成功。属性地址应是网站根地址，不能填写 `/sitemap.xml/`。
- Bing Webmaster Tools 使用独立 XML 文件验证，网站添加成功；未通过 Google 导入或授予额外 OAuth 权限。
- Google 在首次验证时已成功读取 `/sitemap.xml`，发现 95 个网址；首页的 Request indexing 已进入优先抓取队列。发现网址和提交请求均不等于已经编入索引。
- Bing 已接收同一个 sitemap，初始状态为 Processing；首页也已通过 URL Submission 提交成功，等待平台抓取和报告处理。

验证文件保存在 `public/google05b179df02a4663f.html` 和 `public/BingSiteAuth.xml`，以后发布时需要继续保留。`.gitignore` 为 Bing 文件设置了精确例外，避免全局 `*.xml` 规则将它排除。

首次验证发布基于原有线上源码，仅增加两个验证文件，并修复 14 篇文章在 sitemap 中缺少时区的 `lastmod`：保留 frontmatter 的原日期，输出 `YYYY-MM-DD`，不更改文章内容。验证时的 sitemap 为原有的 95 个网址。当前完整 SEO 代码增加了项目与标签详情覆盖，并省略缺少可靠更新时间的 `lastmod`；部署后应以正式 sitemap 的实际内容和两边控制台的重新读取结果为准。

GSC Wizard 连接此前返回参数或传输错误，当前结果以原生控制台为准。GA4 尚未配置 Measurement ID 或验证实时数据，不能把搜索平台的验证成功当作 GA4 访问采集已启用。后续搜索词、展示、点击及索引报告需要等待各平台处理实际数据。
