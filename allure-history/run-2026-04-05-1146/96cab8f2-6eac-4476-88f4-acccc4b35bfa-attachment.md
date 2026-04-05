# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lead-creation.spec.js >> Lead Creation Flow >> should show validation error when company field is empty
- Location: tests\lead-creation.spec.js:224:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('dialog').filter({ hasText: 'Last Name' }).getByRole('button', { name: 'Save' }) resolved to 2 elements:
    1) <button type="button" part="button" kx-type="ripple" name="SaveAndNew" lwc-40a585din3p="" aria-disabled="false" kx-scope="button-neutral" class="slds-button slds-button_neutral">Save & New</button> aka getByRole('button', { name: 'Save & New' })
    2) <button type="button" part="button" name="SaveEdit" kx-type="ripple" lwc-40a585din3p="" aria-disabled="false" kx-scope="button-brand" class="slds-button slds-button_brand">Save</button> aka getByRole('button', { name: 'Save', exact: true })

Call log:
  - waiting for getByRole('dialog').filter({ hasText: 'Last Name' }).getByRole('button', { name: 'Save' })

```

# Page snapshot

```yaml
- generic:
  - generic:
    - generic [ref=e2]:
      - generic [ref=e3]:
        - link [ref=e4] [cursor=pointer]:
          - /url: javascript:void(0);
          - text: Skip to Navigation
        - link [ref=e5] [cursor=pointer]:
          - /url: javascript:void(0);
          - text: Skip to Main Content
        - generic [ref=e6]:
          - button [ref=e12]:
            - img [ref=e14]
            - text: Search...
          - navigation [ref=e17]:
            - list [ref=e19]:
              - listitem [ref=e20]:
                - group [ref=e21]:
                  - button [ref=e23] [cursor=pointer]:
                    - img [ref=e28]
                  - button [ref=e32] [cursor=pointer]:
                    - img [ref=e37]
              - listitem [ref=e40]:
                - button [disabled] [ref=e42]:
                  - img [ref=e46]
              - listitem [ref=e49]:
                - button [ref=e51] [cursor=pointer]:
                  - img [ref=e56]
              - listitem [ref=e59]:
                - button [ref=e62] [cursor=pointer]:
                  - img [ref=e67]
              - listitem [ref=e70]:
                - button [ref=e76] [cursor=pointer]:
                  - img [ref=e81]
              - listitem [ref=e84]:
                - button [ref=e87] [cursor=pointer]:
                  - generic [ref=e89]:
                    - img [ref=e93]
                    - generic [ref=e97]: "2"
                - generic [ref=e98]: 2 new notifications
              - listitem [ref=e99]:
                - button [ref=e102] [cursor=pointer]
      - generic [ref=e107]:
        - generic [ref=e110]:
          - generic [ref=e112]:
            - navigation [ref=e113]:
              - button [ref=e115] [cursor=pointer]:
                - generic [ref=e126]: App Launcher
            - heading [level=1] [ref=e127]:
              - generic [ref=e128]: Sales
          - navigation [ref=e131]:
            - list [ref=e132]:
              - listitem [ref=e133]:
                - link [ref=e134] [cursor=pointer]:
                  - /url: /lightning/page/home
                  - generic [ref=e135]: Home
              - listitem [ref=e136]:
                - link [ref=e137] [cursor=pointer]:
                  - /url: /lightning/o/Opportunity/home
                  - generic [ref=e138]: Opportunities
                - button [ref=e142] [cursor=pointer]:
                  - img [ref=e146]
                  - generic [ref=e149]: Opportunities List
              - listitem [ref=e150] [cursor=pointer]:
                - link [ref=e151]:
                  - /url: /lightning/o/Lead/home
                  - generic [ref=e152]: Leads
                - button [ref=e156]:
                  - img [ref=e160]
                  - generic [ref=e163]: Leads List
              - listitem [ref=e164]:
                - link [ref=e165] [cursor=pointer]:
                  - /url: /lightning/o/Task/home
                  - generic [ref=e166]: Tasks
                - button [ref=e170] [cursor=pointer]:
                  - img [ref=e174]
                  - generic [ref=e177]: Tasks List
              - listitem [ref=e178]:
                - link [ref=e179] [cursor=pointer]:
                  - /url: /lightning/o/ContentDocument/home
                  - generic [ref=e180]: Files
                - button [ref=e184] [cursor=pointer]:
                  - img [ref=e188]
                  - generic [ref=e191]: Files List
              - listitem [ref=e192]:
                - link [ref=e193] [cursor=pointer]:
                  - /url: /lightning/o/Account/home
                  - generic [ref=e194]: Accounts
                - button [ref=e198] [cursor=pointer]:
                  - img [ref=e202]
                  - generic [ref=e205]: Accounts List
              - listitem [ref=e206]:
                - link [ref=e207] [cursor=pointer]:
                  - /url: /lightning/o/Contact/home
                  - generic [ref=e208]: Contacts
                - button [ref=e212] [cursor=pointer]:
                  - img [ref=e216]
                  - generic [ref=e219]: Contacts List
              - listitem [ref=e220]:
                - link [ref=e221] [cursor=pointer]:
                  - /url: /lightning/o/Campaign/home
                  - generic [ref=e222]: Campaigns
                - button [ref=e226] [cursor=pointer]:
                  - img [ref=e230]
                  - generic [ref=e233]: Campaigns List
              - listitem [ref=e234]:
                - link [ref=e235] [cursor=pointer]:
                  - /url: /lightning/o/Dashboard/home
                  - generic [ref=e236]: Dashboards
                - button [ref=e240] [cursor=pointer]:
                  - img [ref=e244]
                  - generic [ref=e247]: Dashboards List
              - listitem [ref=e248]:
                - link [ref=e249] [cursor=pointer]:
                  - /url: /lightning/o/Report/home
                  - generic [ref=e250]: Reports
                - button [ref=e254] [cursor=pointer]:
                  - img [ref=e258]
                  - generic [ref=e261]: Reports List
              - listitem [ref=e262]:
                - link [ref=e263] [cursor=pointer]:
                  - /url: /lightning/page/chatter
                  - generic [ref=e264]: Chatter
              - listitem [ref=e265]:
                - button [ref=e267] [cursor=pointer]:
                  - generic [ref=e268]: More
                  - img [ref=e272]
                  - generic [ref=e275]: Show more navigation items
              - listitem [ref=e276]:
                - button [ref=e278] [cursor=pointer]:
                  - img [ref=e280]
                  - generic [ref=e283]: Edit nav items
        - main [ref=e285]:
          - generic [ref=e293]:
            - generic [ref=e295]:
              - generic [ref=e297]:
                - generic [ref=e301]:
                  - img [ref=e303]
                  - generic [ref=e307]: Lead
                - generic [ref=e308]:
                  - heading [level=1] [ref=e309]: Leads
                  - generic [ref=e314] [cursor=pointer]:
                    - heading [level=1] [ref=e315]:
                      - generic [ref=e316]: Leads
                      - generic [ref=e317]: My Leads
                    - button [ref=e320]:
                      - img [ref=e322]
                      - generic [ref=e325]: "Select a List View: Leads"
              - group [ref=e329]:
                - button [ref=e332] [cursor=pointer]:
                  - img [ref=e334]
                  - img [ref=e338]
                  - generic [ref=e341]: Lead View Settings
                - button [ref=e342] [cursor=pointer]:
                  - img [ref=e344]
                  - generic [ref=e347]: Refresh
                - button [ref=e351] [cursor=pointer]:
                  - img [ref=e353]
                  - generic [ref=e356]: Edit List
                - group [ref=e358]:
                  - generic [ref=e360]:
                    - button [ref=e362] [cursor=pointer]: New
                    - button [ref=e364] [cursor=pointer]: List View
            - generic [ref=e366]:
              - generic [ref=e370]:
                - generic [ref=e371]:
                  - generic [ref=e372]:
                    - generic [ref=e374]: Created
                    - button [ref=e379] [cursor=pointer]:
                      - text: This Quarter
                      - img [ref=e381]
                  - generic [ref=e384]:
                    - generic [ref=e386]: Owner
                    - button [ref=e391] [cursor=pointer]:
                      - text: Me
                      - img [ref=e393]
                - group [ref=e398]:
                  - generic [ref=e400]:
                    - generic [ref=e401]:
                      - button [ref=e404] [cursor=pointer]:
                        - img [ref=e406]
                        - generic [ref=e409]: Important Leads
                      - generic [ref=e410]: Apply Important Leads Filter
                    - tooltip [ref=e411]: Shows the leads you mark as important. If you filter your view, the same filters apply.
                  - button [ref=e415] [cursor=pointer]:
                    - img [ref=e417]
                    - generic [ref=e420]: Show filters
              - group [ref=e423]:
                - button [pressed] [ref=e425] [cursor=pointer]:
                  - generic [ref=e426]:
                    - paragraph [ref=e428]: Total Leads
                    - paragraph [ref=e429]: "39"
                - generic [ref=e430]:
                  - button [ref=e431] [cursor=pointer]:
                    - generic [ref=e432]:
                      - paragraph [ref=e434]: No Activity
                      - paragraph [ref=e436]: "39"
                  - button [ref=e440] [cursor=pointer]:
                    - img [ref=e442]
                    - generic [ref=e445]: Help
                - generic [ref=e446]:
                  - button [ref=e447] [cursor=pointer]:
                    - generic [ref=e448]:
                      - paragraph [ref=e450]: Idle
                      - paragraph [ref=e452]: "0"
                  - button [ref=e456] [cursor=pointer]:
                    - img [ref=e458]
                    - generic [ref=e461]: Help
                - generic [ref=e462]:
                  - button [ref=e463] [cursor=pointer]:
                    - generic [ref=e464]:
                      - paragraph [ref=e466]: No Upcoming
                      - paragraph [ref=e468]: "0"
                  - button [ref=e472] [cursor=pointer]:
                    - img [ref=e474]
                    - generic [ref=e477]: Help
                - button [ref=e479] [cursor=pointer]:
                  - generic [ref=e480]:
                    - paragraph [ref=e482]: Overdue
                    - paragraph [ref=e483]: "0"
                - button [ref=e485] [cursor=pointer]:
                  - generic [ref=e486]:
                    - paragraph [ref=e488]: Due Today
                    - paragraph [ref=e489]: "0"
                - generic [ref=e490]:
                  - button [ref=e491] [cursor=pointer]:
                    - generic [ref=e492]:
                      - paragraph [ref=e494]: Upcoming
                      - paragraph [ref=e496]: "0"
                  - button [ref=e500] [cursor=pointer]:
                    - img [ref=e502]
                    - generic [ref=e505]: Help
              - generic [ref=e507]:
                - generic [ref=e509]:
                  - status [ref=e513]: 25+ items • Filtered by Created Date, Me, Total Leads
                  - group [ref=e516]:
                    - generic [ref=e518]:
                      - button [ref=e520] [cursor=pointer]: Change Status
                      - button [ref=e522] [cursor=pointer]: Change Owner
                      - button [ref=e524] [cursor=pointer]: Send Email
                      - button [ref=e526] [cursor=pointer]: Assign Label
                - generic [ref=e537]:
                  - generic [ref=e538]: Navigation Mode
                  - grid [ref=e542]:
                    - generic [ref=e546]:
                      - generic [ref=e547]: Choose a Row
                      - generic [ref=e549]:
                        - checkbox [ref=e550]
                        - generic [ref=e553]: Select 25 items
                    - generic [ref=e555]:
                      - button [ref=e556] [cursor=pointer]:
                        - generic [ref=e557]: "Sort by:"
                        - generic [ref=e558]: Name
                      - generic [ref=e559]: "Sorted: None"
                      - button [ref=e561] [cursor=pointer]:
                        - img [ref=e563]
                        - generic [ref=e566]: Show Name column actions
                      - slider [ref=e567]: "170"
                    - generic [ref=e575]:
                      - img [ref=e577]
                      - generic [ref=e580]: Important
                    - generic [ref=e582]:
                      - button [ref=e583] [cursor=pointer]:
                        - generic [ref=e584]: "Sort by:"
                        - generic [ref=e585]: Title
                      - generic [ref=e586]: "Sorted: None"
                      - button [ref=e588] [cursor=pointer]:
                        - img [ref=e590]
                        - generic [ref=e593]: Show Title column actions
                      - slider [ref=e594]: "140"
                    - generic [ref=e598]:
                      - button [ref=e599] [cursor=pointer]:
                        - generic [ref=e600]: "Sort by:"
                        - generic [ref=e601]: Company
                      - generic [ref=e602]: "Sorted: None"
                      - button [ref=e604] [cursor=pointer]:
                        - img [ref=e606]
                        - generic [ref=e609]: Show Company column actions
                      - slider [ref=e610]: "180"
                    - generic [ref=e614]:
                      - button [ref=e615] [cursor=pointer]:
                        - generic [ref=e616]: "Sort by:"
                        - generic [ref=e617]: Lead Status
                      - generic [ref=e618]: "Sorted: None"
                      - button [ref=e620] [cursor=pointer]:
                        - img [ref=e622]
                        - generic [ref=e625]: Show Lead Status column actions
                      - slider [ref=e626]: "166"
                    - generic [ref=e630]:
                      - button [ref=e631] [cursor=pointer]:
                        - generic [ref=e632]: "Sort by:"
                        - generic [ref=e633]: Lead Source
                      - generic [ref=e634]: "Sorted: None"
                      - button [ref=e636] [cursor=pointer]:
                        - img [ref=e638]
                        - generic [ref=e641]: Show Lead Source column actions
                      - slider [ref=e642]: "140"
                    - generic [ref=e646]:
                      - button [ref=e647] [cursor=pointer]:
                        - generic [ref=e648]: "Sort by:"
                        - generic [ref=e649]: Last Activity
                      - generic [ref=e650]: "Sorted: None"
                      - button [ref=e652] [cursor=pointer]:
                        - img [ref=e654]
                        - generic [ref=e657]: Show Last Activity column actions
                      - slider [ref=e658]: "140"
                    - generic [ref=e664]: Actions
                    - rowgroup [ref=e668]:
                      - row [ref=e669]:
                        - gridcell [ref=e670]
                        - gridcell [ref=e675]:
                          - generic [ref=e677]:
                            - checkbox [ref=e678]
                            - generic [ref=e681]: Select Item 1
                        - rowheader [ref=e682]:
                          - generic [ref=e684]:
                            - generic [ref=e688]:
                              - link [ref=e691] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjG64UAF/view
                                - generic [ref=e692]: David Miller
                              - button [ref=e694] [cursor=pointer]:
                                - img [ref=e696]
                                - generic [ref=e699]: "View Activity: David Miller"
                            - img [ref=e700]:
                              - img [ref=e702]
                        - gridcell [ref=e705]:
                          - button [ref=e714] [cursor=pointer]:
                            - img [ref=e716]
                            - generic [ref=e719]: "Mark Important: David Miller"
                        - gridcell [ref=e720]:
                          - button [ref=e723] [cursor=pointer]:
                            - img [ref=e725]
                            - generic [ref=e728]: Edit Title
                        - gridcell [ref=e729]:
                          - generic [ref=e731]:
                            - generic [ref=e734]: Premier Industries
                            - button [ref=e735] [cursor=pointer]:
                              - img [ref=e737]
                              - generic [ref=e740]: Edit Company
                        - gridcell [ref=e741]:
                          - generic [ref=e743]:
                            - generic [ref=e746]: Open
                            - button [ref=e747] [cursor=pointer]:
                              - img [ref=e749]
                              - generic [ref=e752]: Edit Lead Status
                        - gridcell [ref=e753]:
                          - button [ref=e756] [cursor=pointer]:
                            - img [ref=e758]
                            - generic [ref=e761]: Edit Lead Source
                        - gridcell [ref=e762]:
                          - img [ref=e765]:
                            - img [ref=e767]
                        - gridcell [ref=e770]:
                          - group [ref=e777]:
                            - generic [ref=e779]:
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e780]:
                          - button [ref=e787] [cursor=pointer]:
                            - img [ref=e789]
                            - generic [ref=e792]: Show Actions
                      - row [ref=e793]:
                        - gridcell [ref=e794]
                        - gridcell [ref=e799]:
                          - generic [ref=e801]:
                            - checkbox [ref=e802]
                            - generic [ref=e805]: Select Item 2
                        - rowheader [ref=e806]:
                          - generic [ref=e808]:
                            - generic [ref=e812]:
                              - link [ref=e815] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjHDKUA3/view
                                - generic [ref=e816]: Jane Smith
                              - button [ref=e818] [cursor=pointer]:
                                - img [ref=e820]
                                - generic [ref=e823]: "View Activity: Jane Smith"
                            - img [ref=e824]:
                              - img [ref=e826]
                        - gridcell [ref=e829]:
                          - button [ref=e838] [cursor=pointer]:
                            - img [ref=e840]
                            - generic [ref=e843]: "Mark Important: Jane Smith"
                        - gridcell [ref=e844]:
                          - generic [ref=e846]:
                            - generic [ref=e849]: Manager
                            - button [ref=e850] [cursor=pointer]:
                              - img [ref=e852]
                              - generic [ref=e855]: Edit Title
                        - gridcell [ref=e856]:
                          - generic [ref=e858]:
                            - generic [ref=e861]: Tech Innovations Inc
                            - button [ref=e862] [cursor=pointer]:
                              - img [ref=e864]
                              - generic [ref=e867]: Edit Company
                        - gridcell [ref=e868]:
                          - generic [ref=e870]:
                            - generic [ref=e873]: Open
                            - button [ref=e874] [cursor=pointer]:
                              - img [ref=e876]
                              - generic [ref=e879]: Edit Lead Status
                        - gridcell [ref=e880]:
                          - button [ref=e883] [cursor=pointer]:
                            - img [ref=e885]
                            - generic [ref=e888]: Edit Lead Source
                        - gridcell [ref=e889]:
                          - img [ref=e892]:
                            - img [ref=e894]
                        - gridcell [ref=e897]:
                          - group [ref=e904]:
                            - generic [ref=e906]:
                              - button [ref=e908] [cursor=pointer]:
                                - img [ref=e910]
                                - generic [ref=e913]: Email
                              - button [ref=e915] [cursor=pointer]:
                                - img [ref=e917]
                                - generic [ref=e920]: Call
                        - gridcell [ref=e921]:
                          - button [ref=e928] [cursor=pointer]:
                            - img [ref=e930]
                            - generic [ref=e933]: Show Actions
                      - row [ref=e934]:
                        - gridcell [ref=e935]
                        - gridcell [ref=e940]:
                          - generic [ref=e942]:
                            - checkbox [ref=e943]
                            - generic [ref=e946]: Select Item 3
                        - rowheader [ref=e947]:
                          - generic [ref=e949]:
                            - generic [ref=e953]:
                              - link [ref=e956] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjIEEUA3/view
                                - generic [ref=e957]: John Doe
                              - button [ref=e959] [cursor=pointer]:
                                - img [ref=e961]
                                - generic [ref=e964]: "View Activity: John Doe"
                            - img [ref=e965]:
                              - img [ref=e967]
                        - gridcell [ref=e970]:
                          - button [ref=e979] [cursor=pointer]:
                            - img [ref=e981]
                            - generic [ref=e984]: "Mark Important: John Doe"
                        - gridcell [ref=e985]:
                          - button [ref=e988] [cursor=pointer]:
                            - img [ref=e990]
                            - generic [ref=e993]: Edit Title
                        - gridcell [ref=e994]:
                          - generic [ref=e996]:
                            - generic [ref=e999]: Acme Corporation
                            - button [ref=e1000] [cursor=pointer]:
                              - img [ref=e1002]
                              - generic [ref=e1005]: Edit Company
                        - gridcell [ref=e1006]:
                          - generic [ref=e1008]:
                            - generic [ref=e1011]: Open
                            - button [ref=e1012] [cursor=pointer]:
                              - img [ref=e1014]
                              - generic [ref=e1017]: Edit Lead Status
                        - gridcell [ref=e1018]:
                          - button [ref=e1021] [cursor=pointer]:
                            - img [ref=e1023]
                            - generic [ref=e1026]: Edit Lead Source
                        - gridcell [ref=e1027]:
                          - img [ref=e1030]:
                            - img [ref=e1032]
                        - gridcell [ref=e1035]:
                          - group [ref=e1042]:
                            - generic [ref=e1044]:
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e1045]:
                          - button [ref=e1052] [cursor=pointer]:
                            - img [ref=e1054]
                            - generic [ref=e1057]: Show Actions
                      - row [ref=e1058]:
                        - gridcell [ref=e1059]
                        - gridcell [ref=e1064]:
                          - generic [ref=e1066]:
                            - checkbox [ref=e1067]
                            - generic [ref=e1070]: Select Item 4
                        - rowheader [ref=e1071]:
                          - generic [ref=e1073]:
                            - generic [ref=e1077]:
                              - link [ref=e1080] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjIJwUAN/view
                                - generic [ref=e1081]: Mark Wilson
                              - button [ref=e1083] [cursor=pointer]:
                                - img [ref=e1085]
                                - generic [ref=e1088]: "View Activity: Mark Wilson"
                            - img [ref=e1089]:
                              - img [ref=e1091]
                        - gridcell [ref=e1094]:
                          - button [ref=e1103] [cursor=pointer]:
                            - img [ref=e1105]
                            - generic [ref=e1108]: "Mark Important: Mark Wilson"
                        - gridcell [ref=e1109]:
                          - button [ref=e1112] [cursor=pointer]:
                            - img [ref=e1114]
                            - generic [ref=e1117]: Edit Title
                        - gridcell [ref=e1118]:
                          - generic [ref=e1120]:
                            - generic [ref=e1123]: Innovation Labs
                            - button [ref=e1124] [cursor=pointer]:
                              - img [ref=e1126]
                              - generic [ref=e1129]: Edit Company
                        - gridcell [ref=e1130]:
                          - generic [ref=e1132]:
                            - generic [ref=e1135]: Open
                            - button [ref=e1136] [cursor=pointer]:
                              - img [ref=e1138]
                              - generic [ref=e1141]: Edit Lead Status
                        - gridcell [ref=e1142]:
                          - button [ref=e1145] [cursor=pointer]:
                            - img [ref=e1147]
                            - generic [ref=e1150]: Edit Lead Source
                        - gridcell [ref=e1151]:
                          - img [ref=e1154]:
                            - img [ref=e1156]
                        - gridcell [ref=e1159]:
                          - group [ref=e1166]:
                            - generic [ref=e1168]:
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e1169]:
                          - button [ref=e1176] [cursor=pointer]:
                            - img [ref=e1178]
                            - generic [ref=e1181]: Show Actions
                      - row [ref=e1182]:
                        - gridcell [ref=e1183]
                        - gridcell [ref=e1188]:
                          - generic [ref=e1190]:
                            - checkbox [ref=e1191]
                            - generic [ref=e1194]: Select Item 5
                        - rowheader [ref=e1195]:
                          - generic [ref=e1197]:
                            - generic [ref=e1201]:
                              - link [ref=e1204] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjIMMUA3/view
                                - generic [ref=e1205]: Robert Brown
                              - button [ref=e1207] [cursor=pointer]:
                                - img [ref=e1209]
                                - generic [ref=e1212]: "View Activity: Robert Brown"
                            - img [ref=e1213]:
                              - img [ref=e1215]
                        - gridcell [ref=e1218]:
                          - button [ref=e1227] [cursor=pointer]:
                            - img [ref=e1229]
                            - generic [ref=e1232]: "Mark Important: Robert Brown"
                        - gridcell [ref=e1233]:
                          - button [ref=e1236] [cursor=pointer]:
                            - img [ref=e1238]
                            - generic [ref=e1241]: Edit Title
                        - gridcell [ref=e1242]:
                          - generic [ref=e1244]:
                            - generic [ref=e1247]: Enterprise Corp
                            - button [ref=e1248] [cursor=pointer]:
                              - img [ref=e1250]
                              - generic [ref=e1253]: Edit Company
                        - gridcell [ref=e1254]:
                          - generic [ref=e1256]:
                            - generic [ref=e1259]: Open
                            - button [ref=e1260] [cursor=pointer]:
                              - img [ref=e1262]
                              - generic [ref=e1265]: Edit Lead Status
                        - gridcell [ref=e1266]:
                          - button [ref=e1269] [cursor=pointer]:
                            - img [ref=e1271]
                            - generic [ref=e1274]: Edit Lead Source
                        - gridcell [ref=e1275]:
                          - img [ref=e1278]:
                            - img [ref=e1280]
                        - gridcell [ref=e1283]:
                          - group [ref=e1290]:
                            - generic [ref=e1292]:
                              - button [ref=e1294] [cursor=pointer]:
                                - img [ref=e1296]
                                - generic [ref=e1299]: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e1300]:
                          - button [ref=e1307] [cursor=pointer]:
                            - img [ref=e1309]
                            - generic [ref=e1312]: Show Actions
                      - row [ref=e1313]:
                        - gridcell [ref=e1314]
                        - gridcell [ref=e1319]:
                          - generic [ref=e1321]:
                            - checkbox [ref=e1322]
                            - generic [ref=e1325]: Select Item 6
                        - rowheader [ref=e1326]:
                          - generic [ref=e1328]:
                            - generic [ref=e1332]:
                              - link [ref=e1335] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjINvUAN/view
                                - generic [ref=e1336]: Mark Wilson
                              - button [ref=e1338] [cursor=pointer]:
                                - img [ref=e1340]
                                - generic [ref=e1343]: "View Activity: Mark Wilson"
                            - img [ref=e1344]:
                              - img [ref=e1346]
                        - gridcell [ref=e1349]:
                          - button [ref=e1358] [cursor=pointer]:
                            - img [ref=e1360]
                            - generic [ref=e1363]: "Mark Important: Mark Wilson"
                        - gridcell [ref=e1364]:
                          - button [ref=e1367] [cursor=pointer]:
                            - img [ref=e1369]
                            - generic [ref=e1372]: Edit Title
                        - gridcell [ref=e1373]:
                          - generic [ref=e1375]:
                            - generic [ref=e1378]: Innovation Labs
                            - button [ref=e1379] [cursor=pointer]:
                              - img [ref=e1381]
                              - generic [ref=e1384]: Edit Company
                        - gridcell [ref=e1385]:
                          - generic [ref=e1387]:
                            - generic [ref=e1390]: Open
                            - button [ref=e1391] [cursor=pointer]:
                              - img [ref=e1393]
                              - generic [ref=e1396]: Edit Lead Status
                        - gridcell [ref=e1397]:
                          - button [ref=e1400] [cursor=pointer]:
                            - img [ref=e1402]
                            - generic [ref=e1405]: Edit Lead Source
                        - gridcell [ref=e1406]:
                          - img [ref=e1409]:
                            - img [ref=e1411]
                        - gridcell [ref=e1414]:
                          - group [ref=e1421]:
                            - generic [ref=e1423]:
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e1424]:
                          - button [ref=e1431] [cursor=pointer]:
                            - img [ref=e1433]
                            - generic [ref=e1436]: Show Actions
                      - row [ref=e1437]:
                        - gridcell [ref=e1438]
                        - gridcell [ref=e1443]:
                          - generic [ref=e1445]:
                            - checkbox [ref=e1446]
                            - generic [ref=e1449]: Select Item 7
                        - rowheader [ref=e1450]:
                          - generic [ref=e1452]:
                            - generic [ref=e1456]:
                              - link [ref=e1459] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjM8CUAV/view
                                - generic [ref=e1460]: François O'Sullivan
                              - button [ref=e1462] [cursor=pointer]:
                                - img [ref=e1464]
                                - generic [ref=e1467]: "View Activity: François O'Sullivan"
                            - img [ref=e1468]:
                              - img [ref=e1470]
                        - gridcell [ref=e1473]:
                          - button [ref=e1482] [cursor=pointer]:
                            - img [ref=e1484]
                            - generic [ref=e1487]: "Mark Important: François O'Sullivan"
                        - gridcell [ref=e1488]:
                          - button [ref=e1491] [cursor=pointer]:
                            - img [ref=e1493]
                            - generic [ref=e1496]: Edit Title
                        - gridcell [ref=e1497]:
                          - generic [ref=e1499]:
                            - generic [ref=e1502]: Société Générale & Partners
                            - button [ref=e1503] [cursor=pointer]:
                              - img [ref=e1505]
                              - generic [ref=e1508]: Edit Company
                        - gridcell [ref=e1509]:
                          - generic [ref=e1511]:
                            - generic [ref=e1514]: Open
                            - button [ref=e1515] [cursor=pointer]:
                              - img [ref=e1517]
                              - generic [ref=e1520]: Edit Lead Status
                        - gridcell [ref=e1521]:
                          - button [ref=e1524] [cursor=pointer]:
                            - img [ref=e1526]
                            - generic [ref=e1529]: Edit Lead Source
                        - gridcell [ref=e1530]:
                          - img [ref=e1533]:
                            - img [ref=e1535]
                        - gridcell [ref=e1538]:
                          - group [ref=e1545]:
                            - generic [ref=e1547]:
                              - button [ref=e1549] [cursor=pointer]:
                                - img [ref=e1551]
                                - generic [ref=e1554]: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e1555]:
                          - button [ref=e1562] [cursor=pointer]:
                            - img [ref=e1564]
                            - generic [ref=e1567]: Show Actions
                      - row [ref=e1568]:
                        - gridcell [ref=e1569]
                        - gridcell [ref=e1574]:
                          - generic [ref=e1576]:
                            - checkbox [ref=e1577]
                            - generic [ref=e1580]: Select Item 8
                        - rowheader [ref=e1581]:
                          - generic [ref=e1583]:
                            - generic [ref=e1587]:
                              - link [ref=e1590] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjMBOUA3/view
                                - generic [ref=e1591]: John Doe
                              - button [ref=e1593] [cursor=pointer]:
                                - img [ref=e1595]
                                - generic [ref=e1598]: "View Activity: John Doe"
                            - img [ref=e1599]:
                              - img [ref=e1601]
                        - gridcell [ref=e1604]:
                          - button [ref=e1613] [cursor=pointer]:
                            - img [ref=e1615]
                            - generic [ref=e1618]: "Mark Important: John Doe"
                        - gridcell [ref=e1619]:
                          - button [ref=e1622] [cursor=pointer]:
                            - img [ref=e1624]
                            - generic [ref=e1627]: Edit Title
                        - gridcell [ref=e1628]:
                          - generic [ref=e1630]:
                            - generic [ref=e1633]: Acme Corporation
                            - button [ref=e1634] [cursor=pointer]:
                              - img [ref=e1636]
                              - generic [ref=e1639]: Edit Company
                        - gridcell [ref=e1640]:
                          - generic [ref=e1642]:
                            - generic [ref=e1645]: Open
                            - button [ref=e1646] [cursor=pointer]:
                              - img [ref=e1648]
                              - generic [ref=e1651]: Edit Lead Status
                        - gridcell [ref=e1652]:
                          - button [ref=e1655] [cursor=pointer]:
                            - img [ref=e1657]
                            - generic [ref=e1660]: Edit Lead Source
                        - gridcell [ref=e1661]:
                          - img [ref=e1664]:
                            - img [ref=e1666]
                        - gridcell [ref=e1669]:
                          - group [ref=e1676]:
                            - generic [ref=e1678]:
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e1679]:
                          - button [ref=e1686] [cursor=pointer]:
                            - img [ref=e1688]
                            - generic [ref=e1691]: Show Actions
                      - row [ref=e1692]:
                        - gridcell [ref=e1693]
                        - gridcell [ref=e1698]:
                          - generic [ref=e1700]:
                            - checkbox [ref=e1701]
                            - generic [ref=e1704]: Select Item 9
                        - rowheader [ref=e1705]:
                          - generic [ref=e1707]:
                            - generic [ref=e1711]:
                              - link [ref=e1714] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjN11UAF/view
                                - generic [ref=e1715]: John Doe
                              - button [ref=e1717] [cursor=pointer]:
                                - img [ref=e1719]
                                - generic [ref=e1722]: "View Activity: John Doe"
                            - img [ref=e1723]:
                              - img [ref=e1725]
                        - gridcell [ref=e1728]:
                          - button [ref=e1737] [cursor=pointer]:
                            - img [ref=e1739]
                            - generic [ref=e1742]: "Mark Important: John Doe"
                        - gridcell [ref=e1743]:
                          - button [ref=e1746] [cursor=pointer]:
                            - img [ref=e1748]
                            - generic [ref=e1751]: Edit Title
                        - gridcell [ref=e1752]:
                          - generic [ref=e1754]:
                            - generic [ref=e1757]: Acme Corporation
                            - button [ref=e1758] [cursor=pointer]:
                              - img [ref=e1760]
                              - generic [ref=e1763]: Edit Company
                        - gridcell [ref=e1764]:
                          - generic [ref=e1766]:
                            - generic [ref=e1769]: Open
                            - button [ref=e1770] [cursor=pointer]:
                              - img [ref=e1772]
                              - generic [ref=e1775]: Edit Lead Status
                        - gridcell [ref=e1776]:
                          - button [ref=e1779] [cursor=pointer]:
                            - img [ref=e1781]
                            - generic [ref=e1784]: Edit Lead Source
                        - gridcell [ref=e1785]:
                          - img [ref=e1788]:
                            - img [ref=e1790]
                        - gridcell [ref=e1793]:
                          - group [ref=e1800]:
                            - generic [ref=e1802]:
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell [ref=e1803]:
                          - button [ref=e1810] [cursor=pointer]:
                            - img [ref=e1812]
                            - generic [ref=e1815]: Show Actions
      - list [ref=e1818]:
        - listitem [ref=e1819]:
          - button [ref=e1822] [cursor=pointer]:
            - img [ref=e1826]
            - generic [ref=e1829]: To Do List
    - dialog "New Lead" [ref=e1832]:
      - generic [ref=e1833]:
        - button "Cancel and close" [ref=e1834] [cursor=pointer]:
          - img [ref=e1836]
          - generic [ref=e1839]: Cancel and close
        - generic [ref=e1840]:
          - generic [ref=e1847]:
            - heading "New Lead" [level=2] [ref=e1849]
            - generic [ref=e1851]:
              - generic [ref=e1852]: "* = Required Information"
              - generic [ref=e1854]:
                - generic [ref=e1859]:
                  - generic [ref=e1861]:
                    - heading "Lead Information" [level=3] [ref=e1862]:
                      - generic [ref=e1863]: Lead Information
                    - list [ref=e1865]:
                      - generic [ref=e1866]:
                        - generic [ref=e1868]:
                          - listitem [ref=e1870]:
                            - generic [ref=e1871]:
                              - generic [ref=e1872]: Lead Owner
                              - generic [ref=e1884]: Rakesh Sharma
                          - listitem [ref=e1886]:
                            - generic [ref=e1893]:
                              - generic [ref=e1895]: "*Lead Status"
                              - generic [ref=e1899]:
                                - combobox "Lead Status" [ref=e1900] [cursor=pointer]:
                                  - generic [ref=e1901]: Open
                                - img [ref=e1905]
                              - status
                        - generic [ref=e1909]:
                          - listitem [ref=e1911]:
                            - button "Undo Name" [ref=e1913] [cursor=pointer]:
                              - img [ref=e1915]
                            - group "Name required" [ref=e1922]:
                              - generic [ref=e1923]:
                                - text: "*Name"
                                - generic "required" [ref=e1924]
                              - generic [ref=e1926]:
                                - generic [ref=e1930]:
                                  - generic [ref=e1932]: Salutation
                                  - generic [ref=e1936]:
                                    - combobox "Salutation" [ref=e1937] [cursor=pointer]:
                                      - generic [ref=e1938]: "--None--"
                                    - img [ref=e1942]
                                  - status
                                - generic [ref=e1948]:
                                  - generic [ref=e1949]: First Name
                                  - textbox "First Name" [ref=e1951]: TestFirst
                                - generic [ref=e1955]:
                                  - generic [ref=e1956]: "*Last Name"
                                  - textbox "Last Name" [ref=e1958]: TestLast
                          - listitem [ref=e1960]:
                            - generic [ref=e1965]:
                              - generic [ref=e1966]: Phone
                              - textbox "Phone" [ref=e1968]
                        - generic [ref=e1970]:
                          - listitem [ref=e1972]:
                            - generic [ref=e1978]:
                              - generic [ref=e1979]: "*Company"
                              - textbox "Company" [ref=e1981]
                          - listitem [ref=e1983]:
                            - button "Undo Email" [ref=e1985] [cursor=pointer]:
                              - img [ref=e1987]
                            - generic [ref=e1994]:
                              - generic [ref=e1995]: Email
                              - textbox "Email" [active] [ref=e1997]: test@example.com
                        - generic [ref=e1999]:
                          - listitem [ref=e2001]:
                            - generic [ref=e2007]:
                              - generic [ref=e2008]: Title
                              - textbox "Title" [ref=e2010]
                          - listitem [ref=e2012]:
                            - generic [ref=e2019]:
                              - generic [ref=e2021]: Rating
                              - generic [ref=e2025]:
                                - combobox "Rating" [ref=e2026] [cursor=pointer]:
                                  - generic [ref=e2027]: "--None--"
                                - img [ref=e2031]
                              - status
                  - generic [ref=e2035]:
                    - heading "Address Information" [level=3] [ref=e2036]:
                      - generic [ref=e2037]: Address Information
                    - list [ref=e2039]:
                      - generic [ref=e2042]:
                        - listitem [ref=e2044]:
                          - group "Address" [ref=e2049]:
                            - generic [ref=e2050]: Address
                            - generic [ref=e2052]:
                              - generic [ref=e2054]:
                                - generic [ref=e2055]: Address Search
                                - generic [ref=e2059]:
                                  - combobox "Address Search" [ref=e2062]
                                  - img [ref=e2066]
                              - status [ref=e2069]
                              - generic [ref=e2071]:
                                - generic [ref=e2072]: Street
                                - textbox "Street" [ref=e2074]
                                - status
                              - generic [ref=e2078]:
                                - generic [ref=e2079]: City
                                - textbox "City" [ref=e2081]
                              - generic [ref=e2082]:
                                - generic [ref=e2085]:
                                  - generic [ref=e2086]: Zip/Postal Code
                                  - textbox "Zip/Postal Code" [ref=e2088]
                                - generic [ref=e2091]:
                                  - generic [ref=e2092]: State/Province
                                  - textbox "State/Province" [ref=e2094]
                              - generic [ref=e2098]:
                                - generic [ref=e2099]: Country
                                - textbox "Country" [ref=e2101]
                        - listitem [ref=e2103]:
                          - generic [ref=e2108]:
                            - generic [ref=e2109]: Website
                            - textbox "Website" [ref=e2111]
                  - generic [ref=e2113]:
                    - heading "Additional Information" [level=3] [ref=e2114]:
                      - generic [ref=e2115]: Additional Information
                    - list [ref=e2117]:
                      - generic [ref=e2118]:
                        - generic [ref=e2120]:
                          - listitem [ref=e2122]:
                            - generic [ref=e2127]:
                              - generic [ref=e2128]: No. of Employees
                              - spinbutton "No. of Employees" [ref=e2130]
                          - listitem [ref=e2132]:
                            - generic [ref=e2139]:
                              - generic [ref=e2141]: Lead Source
                              - generic [ref=e2145]:
                                - combobox "Lead Source" [ref=e2146] [cursor=pointer]:
                                  - generic [ref=e2147]: "--None--"
                                - img [ref=e2151]
                              - status
                        - generic [ref=e2155]:
                          - listitem [ref=e2157]:
                            - generic [ref=e2163]:
                              - generic [ref=e2164]: Annual Revenue
                              - spinbutton "Annual Revenue" [ref=e2166]
                          - listitem [ref=e2168]:
                            - generic [ref=e2175]:
                              - generic [ref=e2177]: Industry
                              - generic [ref=e2181]:
                                - combobox "Industry" [ref=e2182] [cursor=pointer]:
                                  - generic [ref=e2183]: "--None--"
                                - img [ref=e2187]
                              - status
                  - generic [ref=e2191]:
                    - heading "Description Information" [level=3] [ref=e2192]:
                      - generic [ref=e2193]: Description Information
                    - list [ref=e2195]:
                      - listitem [ref=e2200]:
                        - generic [ref=e2204]:
                          - generic [ref=e2205]: Description
                          - textbox "Description" [ref=e2207]
                          - status
                - generic [ref=e2212]:
                  - generic "Cancel" [ref=e2213]:
                    - button "Cancel" [ref=e2218] [cursor=pointer]
                  - generic "Save & New" [ref=e2219]:
                    - button "Save & New" [ref=e2224] [cursor=pointer]
                  - generic "Save" [ref=e2225]:
                    - button "Save" [ref=e2230] [cursor=pointer]
          - status [ref=e2231]
  - generic:
    - status
```

# Test source

```ts
  147 |     // Select Status picklist
  148 |     await sfStep('Select Status = Open - Not Contacted', page, async () => {
  149 |       await dialog.getByRole('combobox', { name: 'Status' }).click();
  150 |       await page.waitForTimeout(500); // Allow dropdown to render
  151 |       await page.getByRole('option', { name: /Open|Not Contacted/i }).first().click();
  152 |     });
  153 | 
  154 |     // ─────────────────────────────────────────────────────────────────
  155 |     // STEP 5: Save the Lead
  156 |     // ─────────────────────────────────────────────────────────────────
  157 |     await sfStep('Click Save button to create Lead', page, async () => {
  158 |       await dialog.getByRole('button', { name: 'Save' }).click();
  159 |     });
  160 | 
  161 |     // ─────────────────────────────────────────────────────────────────
  162 |     // STEP 6: Verify Success Toast
  163 |     // ─────────────────────────────────────────────────────────────────
  164 |     const toast = page.locator('.toastMessage');
  165 | 
  166 |     await sfStep('Verify success toast is visible', page, async () => {
  167 |       await expect(toast).toBeVisible({ timeout: 25000 });
  168 |     });
  169 | 
  170 |     // Verify toast contains success text
  171 |     await sfStep('Verify toast contains "was created" text', page, async () => {
  172 |       const toastText = await toast.textContent();
  173 |       expect(toastText).toContain('was created');
  174 |     });
  175 | 
  176 |     // ─────────────────────────────────────────────────────────────────
  177 |     // STEP 7: Verify Lead Detail Page
  178 |     // ─────────────────────────────────────────────────────────────────
  179 |     await waitForSFLoad(page);
  180 | 
  181 |     await sfStep('Verify Lead detail page heading matches full name', page, async () => {
  182 |       await expect(page.getByRole('heading', { name: fullLeadName })).toBeVisible({
  183 |         timeout: 20000,
  184 |       });
  185 |     });
  186 | 
  187 |     // ─────────────────────────────────────────────────────────────────
  188 |     // STEP 8: Navigate back to Leads List View
  189 |     // ─────────────────────────────────────────────────────────────────
  190 |     await sfStep('Click Leads link to return to list view', page, async () => {
  191 |       await page.getByRole('link', { name: 'Leads' }).click();
  192 |     });
  193 | 
  194 |     await waitForSFLoad(page);
  195 | 
  196 |     // ─────────────────────────────────────────────────────────────────
  197 |     // STEP 9: Switch to All Leads and Verify Record Exists
  198 |     // ─────────────────────────────────────────────────────────────────
  199 |     await sfStep('Switch to All Leads list view', page, async () => {
  200 |       await switchToAllRecords(page, 'Leads');
  201 |     });
  202 | 
  203 |     await sfStep(`Verify Lead "${fullLeadName}" appears in list`, page, async () => {
  204 |       await expect(page.getByRole('link', { name: fullLeadName })).toBeVisible({
  205 |         timeout: 20000,
  206 |       });
  207 |     });
  208 | 
  209 |     // Verify no error messages on page
  210 |     await expect(page.getByText(/error|failed/i)).not.toBeVisible();
  211 | 
  212 |     // Stop tracing and save recording
  213 |     await context.tracing.stop({ path: 'reports/traces/lead-creation.trace.zip' });
  214 |   });
  215 | 
  216 |   // ─────────────────────────────────────────────────────────────────
  217 |   // NEGATIVE TEST: Missing Required Field
  218 |   // ─────────────────────────────────────────────────────────────────
  219 |   test('should show validation error when company field is empty', async ({ page }) => {
  220 |     await sfStep('Navigate to Salesforce Leads', page, async () => {
  221 |       await page.goto(process.env.SF_URL);
  222 |       await waitForSFLoad(page);
  223 |       await page.getByRole('link', { name: 'Leads' }).click();
  224 |       await waitForSFLoad(page);
  225 |     });
  226 | 
  227 |     await sfStep('Open New Lead modal', page, async () => {
  228 |       await page.getByRole('button', { name: 'New' }).click();
  229 |     });
  230 | 
  231 |     const dialog = page.getByRole('dialog').filter({ hasText: 'Last Name' });
  232 |     await dialog.waitFor({ state: 'visible', timeout: 20000 });
  233 | 
  234 |     await sfStep('Fill required fields except Company', page, async () => {
  235 |       await dialog.getByLabel('First Name').fill('TestFirst');
  236 |       await dialog.getByLabel('Last Name').fill('TestLast');
  237 |       // Skip Company field intentionally
  238 |       await dialog.getByLabel('Email').fill('test@example.com');
  239 |     });
  240 | 
  241 |     await sfStep('Attempt to save without Company', page, async () => {
  242 |       await dialog.getByRole('button', { name: 'Save' }).click();
  243 |     });
  244 | 
  245 |     // Verify validation error appears
  246 |     await sfStep('Verify validation error or toast appears', page, async () => {
> 247 |       const errorOrToast = page.locator(
      |                                                          ^ Error: locator.click: Error: strict mode violation: getByRole('dialog').filter({ hasText: 'Last Name' }).getByRole('button', { name: 'Save' }) resolved to 2 elements:
  248 |         '.toastMessage, [role="alert"], .slds-notify--error'
  249 |       ).first();
  250 |       await expect(errorOrToast).toBeVisible({ timeout: 15000 });
  251 |     });
  252 |   });
  253 | 
  254 |   // ─────────────────────────────────────────────────────────────────
  255 |   // NEGATIVE TEST: Cancel Lead Creation
  256 |   // ─────────────────────────────────────────────────────────────────
  257 |   test('should close modal when Cancel button is clicked', async ({ page }) => {
  258 |     await sfStep('Navigate to Salesforce Leads', page, async () => {
  259 |       await page.goto(process.env.SF_URL);
  260 |       await waitForSFLoad(page);
  261 |       await page.getByRole('link', { name: 'Leads' }).click();
  262 |       await waitForSFLoad(page);
  263 |     });
  264 | 
  265 |     await sfStep('Open New Lead modal', page, async () => {
  266 |       await page.getByRole('button', { name: 'New' }).click();
  267 |     });
  268 | 
  269 |     const dialog = page.getByRole('dialog').filter({ hasText: 'Last Name' });
  270 |     await dialog.waitFor({ state: 'visible', timeout: 20000 });
  271 | 
  272 |     await sfStep('Fill some fields and click Cancel', page, async () => {
  273 |       await dialog.getByLabel('First Name').fill('CancelTest');
  274 |       await dialog.getByRole('button', { name: 'Cancel' }).click();
  275 |     });
  276 | 
  277 |     // Verify modal is closed
  278 |     await sfStep('Verify modal is closed', page, async () => {
  279 |       await expect(dialog).not.toBeVisible({ timeout: 10000 });
  280 |     });
  281 |   });
  282 | });
  283 | 
```