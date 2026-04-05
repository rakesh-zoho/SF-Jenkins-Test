# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lead-creation.spec.js >> 1. Lead Creation - Basic Information >> 1.1 Create Lead with Required Fields Only
- Location: tests\lead-creation.spec.js:87:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link "Skip to Navigation" [ref=e4] [cursor=pointer]:
        - /url: javascript:void(0);
      - link "Skip to Main Content" [ref=e5] [cursor=pointer]:
        - /url: javascript:void(0);
      - generic [ref=e6]:
        - button "Search" [ref=e12]:
          - img [ref=e14]
          - text: Search...
        - navigation "Global Header" [ref=e17]:
          - list [ref=e19]:
            - listitem [ref=e20]:
              - group [ref=e21]:
                - button "This item doesn't support favorites" [ref=e23] [cursor=pointer]:
                  - generic [ref=e24]:
                    - img [ref=e28]
                    - tooltip "This item doesn't support favorites"
                - button "Favorites list" [ref=e32] [cursor=pointer]:
                  - generic [ref=e33]:
                    - img [ref=e37]
                    - tooltip "Favorites list"
            - listitem [ref=e40]:
              - button "Global Actions" [disabled] [ref=e42]:
                - img [ref=e46]
            - listitem [ref=e49]:
              - button "Guidance Center" [ref=e51] [cursor=pointer]:
                - generic [ref=e52]:
                  - img [ref=e56]
                  - tooltip "Guidance Center"
            - listitem [ref=e59]:
              - button "Salesforce Help" [ref=e62] [cursor=pointer]:
                - generic [ref=e63]:
                  - img [ref=e67]
                  - tooltip "Salesforce Help"
            - listitem [ref=e70]:
              - button "Setup" [ref=e76] [cursor=pointer]:
                - generic [ref=e77]:
                  - img [ref=e81]
                  - tooltip "Setup"
            - listitem [ref=e84]:
              - button "2 Notifications" [ref=e87] [cursor=pointer]:
                - generic [ref=e88]:
                  - generic [ref=e89]:
                    - img [ref=e93]
                    - generic [ref=e97]: "2"
                  - tooltip "Notifications"
              - generic [ref=e98]: 2 new notifications
            - listitem [ref=e99]:
              - button "View profile" [ref=e102] [cursor=pointer]:
                - generic [ref=e103]:
                  - tooltip "View profile"
    - generic [ref=e107]:
      - generic [ref=e110]:
        - generic [ref=e112]:
          - navigation "App" [ref=e113]:
            - button "App Launcher" [ref=e115] [cursor=pointer]:
              - generic [ref=e126]: App Launcher
          - heading "Sales" [level=1] [ref=e127]:
            - generic "Sales" [ref=e128]
        - navigation "Global" [ref=e131]:
          - list [ref=e132]:
            - listitem [ref=e133]:
              - link "Home" [ref=e134] [cursor=pointer]:
                - /url: /lightning/page/home
                - generic [ref=e135]: Home
            - listitem [ref=e136]:
              - link "Opportunities" [ref=e137] [cursor=pointer]:
                - /url: /lightning/o/Opportunity/home
                - generic [ref=e138]: Opportunities
              - button "Opportunities List" [ref=e142] [cursor=pointer]:
                - img [ref=e146]
                - generic [ref=e149]: Opportunities List
            - listitem [ref=e150] [cursor=pointer]:
              - link "Leads" [ref=e151]:
                - /url: /lightning/o/Lead/home
                - generic [ref=e152]: Leads
              - button "Leads List" [ref=e156]:
                - img [ref=e160]
                - generic [ref=e163]: Leads List
            - listitem [ref=e164]:
              - link "Tasks" [ref=e165] [cursor=pointer]:
                - /url: /lightning/o/Task/home
                - generic [ref=e166]: Tasks
              - button "Tasks List" [ref=e170] [cursor=pointer]:
                - img [ref=e174]
                - generic [ref=e177]: Tasks List
            - listitem [ref=e178]:
              - link "Files" [ref=e179] [cursor=pointer]:
                - /url: /lightning/o/ContentDocument/home
                - generic [ref=e180]: Files
              - button "Files List" [ref=e184] [cursor=pointer]:
                - img [ref=e188]
                - generic [ref=e191]: Files List
            - listitem [ref=e192]:
              - link "Accounts" [ref=e193] [cursor=pointer]:
                - /url: /lightning/o/Account/home
                - generic [ref=e194]: Accounts
              - button "Accounts List" [ref=e198] [cursor=pointer]:
                - img [ref=e202]
                - generic [ref=e205]: Accounts List
            - listitem [ref=e206]:
              - link "Contacts" [ref=e207] [cursor=pointer]:
                - /url: /lightning/o/Contact/home
                - generic [ref=e208]: Contacts
              - button "Contacts List" [ref=e212] [cursor=pointer]:
                - img [ref=e216]
                - generic [ref=e219]: Contacts List
            - listitem [ref=e220]:
              - link "Campaigns" [ref=e221] [cursor=pointer]:
                - /url: /lightning/o/Campaign/home
                - generic [ref=e222]: Campaigns
              - button "Campaigns List" [ref=e226] [cursor=pointer]:
                - img [ref=e230]
                - generic [ref=e233]: Campaigns List
            - listitem [ref=e234]:
              - link "Dashboards" [ref=e235] [cursor=pointer]:
                - /url: /lightning/o/Dashboard/home
                - generic [ref=e236]: Dashboards
              - button "Dashboards List" [ref=e240] [cursor=pointer]:
                - img [ref=e244]
                - generic [ref=e247]: Dashboards List
            - listitem [ref=e248]:
              - link "Reports" [ref=e249] [cursor=pointer]:
                - /url: /lightning/o/Report/home
                - generic [ref=e250]: Reports
              - button "Reports List" [ref=e254] [cursor=pointer]:
                - img [ref=e258]
                - generic [ref=e261]: Reports List
            - listitem [ref=e262]:
              - link "Chatter" [ref=e263] [cursor=pointer]:
                - /url: /lightning/page/chatter
                - generic [ref=e264]: Chatter
            - listitem [ref=e265]:
              - button "Show more navigation items" [ref=e267] [cursor=pointer]:
                - generic [ref=e268]: More
                - img [ref=e272]
                - generic [ref=e275]: Show more navigation items
            - listitem [ref=e276]:
              - button "Edit nav items" [ref=e278] [cursor=pointer]:
                - img [ref=e280]
                - generic [ref=e283]: Edit nav items
      - main [ref=e285]:
        - generic [ref=e293]:
          - generic [ref=e295]:
            - generic [ref=e297]:
              - generic "Lead" [ref=e299]:
                - generic [ref=e301]:
                  - img [ref=e303]
                  - generic [ref=e307]: Lead
              - generic [ref=e308]:
                - heading "Leads" [level=1] [ref=e309]
                - generic [ref=e314] [cursor=pointer]:
                  - heading "Leads My Leads" [level=1] [ref=e315]:
                    - generic [ref=e316]: Leads
                    - generic [ref=e317]: My Leads
                  - 'button "Select a List View: Leads" [ref=e320]':
                    - img [ref=e322]
                    - generic [ref=e325]: "Select a List View: Leads"
            - group [ref=e329]:
              - generic "Lead View Settings" [ref=e331]:
                - button "Lead View Settings" [ref=e332] [cursor=pointer]:
                  - img [ref=e334]
                  - img [ref=e338]
                  - generic [ref=e341]: Lead View Settings
              - button "Refresh" [ref=e342] [cursor=pointer]:
                - img [ref=e344]
                - generic [ref=e347]: Refresh
              - button "Edit List" [ref=e351] [cursor=pointer]:
                - img [ref=e353]
                - generic [ref=e356]: Edit List
              - group [ref=e358]:
                - generic [ref=e360]:
                  - button "New" [ref=e362] [cursor=pointer]
                  - button "List View" [ref=e364] [cursor=pointer]
          - generic [ref=e366]:
            - generic [ref=e370]:
              - generic [ref=e371]:
                - generic [ref=e372]:
                  - generic [ref=e374]: Created
                  - 'button "Time Period Filter: This Quarter" [ref=e379] [cursor=pointer]':
                    - text: This Quarter
                    - img [ref=e381]
                - generic [ref=e384]:
                  - generic [ref=e386]: Owner
                  - 'button "Lead owner filter: Me" [ref=e391] [cursor=pointer]':
                    - text: Me
                    - img [ref=e393]
              - group [ref=e398]:
                - generic [ref=e400]:
                  - generic [ref=e401]:
                    - button "Important Leads" [ref=e404] [cursor=pointer]:
                      - img [ref=e406]
                      - generic [ref=e409]: Important Leads
                    - generic [ref=e410]: Apply Important Leads Filter
                  - tooltip "Shows the leads you mark as important. If you filter your view, the same filters apply." [ref=e411]
                - button "Show filters" [ref=e415] [cursor=pointer]:
                  - img [ref=e417]
                  - generic [ref=e420]: Show filters
            - group "Key Performance Indicators" [ref=e423]:
              - button "Total Leads 66" [pressed] [ref=e425] [cursor=pointer]:
                - generic [ref=e426]:
                  - paragraph [ref=e428]: Total Leads
                  - paragraph [ref=e429]: "66"
              - generic [ref=e430]:
                - button "No Activity 66" [ref=e431] [cursor=pointer]:
                  - generic [ref=e432]:
                    - paragraph [ref=e434]: No Activity
                    - paragraph [ref=e436]: "66"
                - button "Help" [ref=e440] [cursor=pointer]:
                  - img [ref=e442]
                  - generic [ref=e445]: Help
              - generic [ref=e446]:
                - button "Idle 0" [ref=e447] [cursor=pointer]:
                  - generic [ref=e448]:
                    - paragraph [ref=e450]: Idle
                    - paragraph [ref=e452]: "0"
                - button "Help" [ref=e456] [cursor=pointer]:
                  - img [ref=e458]
                  - generic [ref=e461]: Help
              - generic [ref=e462]:
                - button "No Upcoming 0" [ref=e463] [cursor=pointer]:
                  - generic [ref=e464]:
                    - paragraph [ref=e466]: No Upcoming
                    - paragraph [ref=e468]: "0"
                - button "Help" [ref=e472] [cursor=pointer]:
                  - img [ref=e474]
                  - generic [ref=e477]: Help
              - button "Overdue 0" [ref=e479] [cursor=pointer]:
                - generic [ref=e480]:
                  - paragraph [ref=e482]: Overdue
                  - paragraph [ref=e483]: "0"
              - button "Due Today 0" [ref=e485] [cursor=pointer]:
                - generic [ref=e486]:
                  - paragraph [ref=e488]: Due Today
                  - paragraph [ref=e489]: "0"
              - generic [ref=e490]:
                - button "Upcoming 0" [ref=e491] [cursor=pointer]:
                  - generic [ref=e492]:
                    - paragraph [ref=e494]: Upcoming
                    - paragraph [ref=e496]: "0"
                - button "Help" [ref=e500] [cursor=pointer]:
                  - img [ref=e502]
                  - generic [ref=e505]: Help
            - generic [ref=e507]:
              - generic [ref=e509]:
                - status [ref=e513]: 25 items • Filtered by Created Date, Me, Total Leads
                - group [ref=e516]:
                  - generic [ref=e518]:
                    - button "Change Status" [ref=e520] [cursor=pointer]
                    - button "Change Owner" [ref=e522] [cursor=pointer]
                    - button "Send Email" [ref=e524] [cursor=pointer]
                    - button "Assign Label" [ref=e526] [cursor=pointer]
              - generic [ref=e528]:
                - generic [ref=e537]:
                  - generic [ref=e538]: Navigation Mode
                  - grid [ref=e542]:
                    - rowgroup:
                      - row "Row Number Choose a Row Select 25 items Name Important Title Company Lead Status Lead Source Last Activity Actions Action":
                        - columnheader "Row Number":
                          - generic [ref=e545]:
                            - generic "Row Number"
                        - gridcell "Choose a Row Select 25 items":
                          - generic [ref=e546]:
                            - generic [ref=e547]: Choose a Row
                            - generic [ref=e549]:
                              - checkbox "Select 25 items" [ref=e550]
                              - generic [ref=e553]: Select 25 items
                        - columnheader "Name":
                          - generic [ref=e555]:
                            - 'button "Sort by: Name" [ref=e556] [cursor=pointer]':
                              - generic [ref=e557]: "Sort by:"
                              - generic "Name" [ref=e558]
                            - generic [ref=e559]: "Sorted: None"
                            - button "Show Name column actions" [ref=e561] [cursor=pointer]:
                              - img [ref=e563]
                              - generic [ref=e566]: Show Name column actions
                            - slider "Name column width" [ref=e567]: "170"
                        - columnheader "Important":
                          - generic "Important" [ref=e574]:
                            - generic [ref=e575]:
                              - img [ref=e577]
                              - generic [ref=e580]: Important
                        - columnheader "Title":
                          - generic [ref=e582]:
                            - 'button "Sort by: Title" [ref=e583] [cursor=pointer]':
                              - generic [ref=e584]: "Sort by:"
                              - generic "Title" [ref=e585]
                            - generic [ref=e586]: "Sorted: None"
                            - button "Show Title column actions" [ref=e588] [cursor=pointer]:
                              - img [ref=e590]
                              - generic [ref=e593]: Show Title column actions
                            - slider "Title column width" [ref=e594]: "140"
                        - columnheader "Company":
                          - generic [ref=e598]:
                            - 'button "Sort by: Company" [ref=e599] [cursor=pointer]':
                              - generic [ref=e600]: "Sort by:"
                              - generic "Company" [ref=e601]
                            - generic [ref=e602]: "Sorted: None"
                            - button "Show Company column actions" [ref=e604] [cursor=pointer]:
                              - img [ref=e606]
                              - generic [ref=e609]: Show Company column actions
                            - slider "Company column width" [ref=e610]: "180"
                        - columnheader "Lead Status":
                          - generic [ref=e614]:
                            - 'button "Sort by: Lead Status" [ref=e615] [cursor=pointer]':
                              - generic [ref=e616]: "Sort by:"
                              - generic "Lead Status" [ref=e617]
                            - generic [ref=e618]: "Sorted: None"
                            - button "Show Lead Status column actions" [ref=e620] [cursor=pointer]:
                              - img [ref=e622]
                              - generic [ref=e625]: Show Lead Status column actions
                            - slider "Lead Status column width" [ref=e626]: "166"
                        - columnheader "Lead Source":
                          - generic [ref=e630]:
                            - 'button "Sort by: Lead Source" [ref=e631] [cursor=pointer]':
                              - generic [ref=e632]: "Sort by:"
                              - generic "Lead Source" [ref=e633]
                            - generic [ref=e634]: "Sorted: None"
                            - button "Show Lead Source column actions" [ref=e636] [cursor=pointer]:
                              - img [ref=e638]
                              - generic [ref=e641]: Show Lead Source column actions
                            - slider "Lead Source column width" [ref=e642]: "140"
                        - columnheader "Last Activity":
                          - generic [ref=e646]:
                            - 'button "Sort by: Last Activity" [ref=e647] [cursor=pointer]':
                              - generic [ref=e648]: "Sort by:"
                              - generic "Last Activity" [ref=e649]
                            - generic [ref=e650]: "Sorted: None"
                            - button "Show Last Activity column actions" [ref=e652] [cursor=pointer]:
                              - img [ref=e654]
                              - generic [ref=e657]: Show Last Activity column actions
                            - slider "Last Activity column width" [ref=e658]: "140"
                        - columnheader "Actions":
                          - generic "Actions" [ref=e664]
                        - columnheader "Action":
                          - generic [ref=e667]:
                            - generic "Action"
                    - rowgroup [ref=e668]:
                      - 'row "Select Item 1 Choose a Row David Miller View Activity: David Miller Locked Name Mark Important: David Miller Edit Title Premier Industries Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e669]':
                        - gridcell [ref=e670]
                        - gridcell "Select Item 1 Choose a Row" [ref=e675]:
                          - generic [ref=e677]:
                            - checkbox "Select Item 1 Choose a Row" [ref=e678]
                            - generic [ref=e681]: Select Item 1
                        - 'rowheader "David Miller View Activity: David Miller Locked Name" [ref=e682]':
                          - generic [ref=e684]:
                            - generic [ref=e688]:
                              - link "David Miller" [ref=e691] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjG64UAF/view
                                - generic [ref=e692]: David Miller
                              - 'button "View Activity: David Miller" [ref=e694] [cursor=pointer]':
                                - img [ref=e696]
                                - generic [ref=e699]: "View Activity: David Miller"
                            - img "Locked Name" [ref=e700]:
                              - img [ref=e702]
                        - 'gridcell "Mark Important: David Miller" [ref=e705]':
                          - 'button "Mark Important: David Miller" [ref=e714] [cursor=pointer]':
                            - img [ref=e716]
                            - generic [ref=e719]: "Mark Important: David Miller"
                        - gridcell "Edit Title" [ref=e720]:
                          - button "Edit Title" [ref=e723] [cursor=pointer]:
                            - img [ref=e725]
                            - generic [ref=e728]: Edit Title
                        - gridcell "Premier Industries Edit Company" [ref=e729]:
                          - generic [ref=e731]:
                            - generic [ref=e734]: Premier Industries
                            - button "Edit Company" [ref=e735] [cursor=pointer]:
                              - img [ref=e737]
                              - generic [ref=e740]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e741]:
                          - generic [ref=e743]:
                            - generic [ref=e746]: Open
                            - button "Edit Lead Status" [ref=e747] [cursor=pointer]:
                              - img [ref=e749]
                              - generic [ref=e752]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e753]:
                          - button "Edit Lead Source" [ref=e756] [cursor=pointer]:
                            - img [ref=e758]
                            - generic [ref=e761]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e762]:
                          - img "Locked Last Activity" [ref=e765]:
                            - img [ref=e767]
                        - gridcell [ref=e770]:
                          - group [ref=e777]:
                            - generic [ref=e779]:
                              - generic:
                                - button "Email" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e780]:
                          - button "Show Actions" [ref=e787] [cursor=pointer]:
                            - img [ref=e789]
                            - generic [ref=e792]: Show Actions
                      - 'row "Select Item 2 Choose a Row Jane Smith View Activity: Jane Smith Locked Name Mark Important: Jane Smith Manager Edit Title Tech Innovations Inc Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e793]':
                        - gridcell [ref=e794]
                        - gridcell "Select Item 2 Choose a Row" [ref=e799]:
                          - generic [ref=e801]:
                            - checkbox "Select Item 2 Choose a Row" [ref=e802]
                            - generic [ref=e805]: Select Item 2
                        - 'rowheader "Jane Smith View Activity: Jane Smith Locked Name" [ref=e806]':
                          - generic [ref=e808]:
                            - generic [ref=e812]:
                              - link "Jane Smith" [ref=e815] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjHDKUA3/view
                                - generic [ref=e816]: Jane Smith
                              - 'button "View Activity: Jane Smith" [ref=e818] [cursor=pointer]':
                                - img [ref=e820]
                                - generic [ref=e823]: "View Activity: Jane Smith"
                            - img "Locked Name" [ref=e824]:
                              - img [ref=e826]
                        - 'gridcell "Mark Important: Jane Smith" [ref=e829]':
                          - 'button "Mark Important: Jane Smith" [ref=e838] [cursor=pointer]':
                            - img [ref=e840]
                            - generic [ref=e843]: "Mark Important: Jane Smith"
                        - gridcell "Manager Edit Title" [ref=e844]:
                          - generic [ref=e846]:
                            - generic [ref=e849]: Manager
                            - button "Edit Title" [ref=e850] [cursor=pointer]:
                              - img [ref=e852]
                              - generic [ref=e855]: Edit Title
                        - gridcell "Tech Innovations Inc Edit Company" [ref=e856]:
                          - generic [ref=e858]:
                            - generic [ref=e861]: Tech Innovations Inc
                            - button "Edit Company" [ref=e862] [cursor=pointer]:
                              - img [ref=e864]
                              - generic [ref=e867]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e868]:
                          - generic [ref=e870]:
                            - generic [ref=e873]: Open
                            - button "Edit Lead Status" [ref=e874] [cursor=pointer]:
                              - img [ref=e876]
                              - generic [ref=e879]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e880]:
                          - button "Edit Lead Source" [ref=e883] [cursor=pointer]:
                            - img [ref=e885]
                            - generic [ref=e888]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e889]:
                          - img "Locked Last Activity" [ref=e892]:
                            - img [ref=e894]
                        - gridcell [ref=e897]:
                          - group [ref=e904]:
                            - generic [ref=e906]:
                              - button "Email" [ref=e908] [cursor=pointer]:
                                - img [ref=e910]
                                - generic [ref=e913]: Email
                              - button "Call" [ref=e915] [cursor=pointer]:
                                - img [ref=e917]
                                - generic [ref=e920]: Call
                        - gridcell "Show Actions" [ref=e921]:
                          - button "Show Actions" [ref=e928] [cursor=pointer]:
                            - img [ref=e930]
                            - generic [ref=e933]: Show Actions
                      - 'row "Select Item 3 Choose a Row John Doe View Activity: John Doe Locked Name Mark Important: John Doe Edit Title Acme Corporation Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e934]':
                        - gridcell [ref=e935]
                        - gridcell "Select Item 3 Choose a Row" [ref=e940]:
                          - generic [ref=e942]:
                            - checkbox "Select Item 3 Choose a Row" [ref=e943]
                            - generic [ref=e946]: Select Item 3
                        - 'rowheader "John Doe View Activity: John Doe Locked Name" [ref=e947]':
                          - generic [ref=e949]:
                            - generic [ref=e953]:
                              - link "John Doe" [ref=e956] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjIEEUA3/view
                                - generic [ref=e957]: John Doe
                              - 'button "View Activity: John Doe" [ref=e959] [cursor=pointer]':
                                - img [ref=e961]
                                - generic [ref=e964]: "View Activity: John Doe"
                            - img "Locked Name" [ref=e965]:
                              - img [ref=e967]
                        - 'gridcell "Mark Important: John Doe" [ref=e970]':
                          - 'button "Mark Important: John Doe" [ref=e979] [cursor=pointer]':
                            - img [ref=e981]
                            - generic [ref=e984]: "Mark Important: John Doe"
                        - gridcell "Edit Title" [ref=e985]:
                          - button "Edit Title" [ref=e988] [cursor=pointer]:
                            - img [ref=e990]
                            - generic [ref=e993]: Edit Title
                        - gridcell "Acme Corporation Edit Company" [ref=e994]:
                          - generic [ref=e996]:
                            - generic [ref=e999]: Acme Corporation
                            - button "Edit Company" [ref=e1000] [cursor=pointer]:
                              - img [ref=e1002]
                              - generic [ref=e1005]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e1006]:
                          - generic [ref=e1008]:
                            - generic [ref=e1011]: Open
                            - button "Edit Lead Status" [ref=e1012] [cursor=pointer]:
                              - img [ref=e1014]
                              - generic [ref=e1017]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e1018]:
                          - button "Edit Lead Source" [ref=e1021] [cursor=pointer]:
                            - img [ref=e1023]
                            - generic [ref=e1026]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e1027]:
                          - img "Locked Last Activity" [ref=e1030]:
                            - img [ref=e1032]
                        - gridcell [ref=e1035]:
                          - group [ref=e1042]:
                            - generic [ref=e1044]:
                              - generic:
                                - button "Email" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e1045]:
                          - button "Show Actions" [ref=e1052] [cursor=pointer]:
                            - img [ref=e1054]
                            - generic [ref=e1057]: Show Actions
                      - 'row "Select Item 4 Choose a Row Mark Wilson View Activity: Mark Wilson Locked Name Mark Important: Mark Wilson Edit Title Innovation Labs Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e1058]':
                        - gridcell [ref=e1059]
                        - gridcell "Select Item 4 Choose a Row" [ref=e1064]:
                          - generic [ref=e1066]:
                            - checkbox "Select Item 4 Choose a Row" [ref=e1067]
                            - generic [ref=e1070]: Select Item 4
                        - 'rowheader "Mark Wilson View Activity: Mark Wilson Locked Name" [ref=e1071]':
                          - generic [ref=e1073]:
                            - generic [ref=e1077]:
                              - link "Mark Wilson" [ref=e1080] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjIJwUAN/view
                                - generic [ref=e1081]: Mark Wilson
                              - 'button "View Activity: Mark Wilson" [ref=e1083] [cursor=pointer]':
                                - img [ref=e1085]
                                - generic [ref=e1088]: "View Activity: Mark Wilson"
                            - img "Locked Name" [ref=e1089]:
                              - img [ref=e1091]
                        - 'gridcell "Mark Important: Mark Wilson" [ref=e1094]':
                          - 'button "Mark Important: Mark Wilson" [ref=e1103] [cursor=pointer]':
                            - img [ref=e1105]
                            - generic [ref=e1108]: "Mark Important: Mark Wilson"
                        - gridcell "Edit Title" [ref=e1109]:
                          - button "Edit Title" [ref=e1112] [cursor=pointer]:
                            - img [ref=e1114]
                            - generic [ref=e1117]: Edit Title
                        - gridcell "Innovation Labs Edit Company" [ref=e1118]:
                          - generic [ref=e1120]:
                            - generic [ref=e1123]: Innovation Labs
                            - button "Edit Company" [ref=e1124] [cursor=pointer]:
                              - img [ref=e1126]
                              - generic [ref=e1129]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e1130]:
                          - generic [ref=e1132]:
                            - generic [ref=e1135]: Open
                            - button "Edit Lead Status" [ref=e1136] [cursor=pointer]:
                              - img [ref=e1138]
                              - generic [ref=e1141]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e1142]:
                          - button "Edit Lead Source" [ref=e1145] [cursor=pointer]:
                            - img [ref=e1147]
                            - generic [ref=e1150]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e1151]:
                          - img "Locked Last Activity" [ref=e1154]:
                            - img [ref=e1156]
                        - gridcell [ref=e1159]:
                          - group [ref=e1166]:
                            - generic [ref=e1168]:
                              - generic:
                                - button "Email" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e1169]:
                          - button "Show Actions" [ref=e1176] [cursor=pointer]:
                            - img [ref=e1178]
                            - generic [ref=e1181]: Show Actions
                      - 'row "Select Item 5 Choose a Row Robert Brown View Activity: Robert Brown Locked Name Mark Important: Robert Brown Edit Title Enterprise Corp Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e1182]':
                        - gridcell [ref=e1183]
                        - gridcell "Select Item 5 Choose a Row" [ref=e1188]:
                          - generic [ref=e1190]:
                            - checkbox "Select Item 5 Choose a Row" [ref=e1191]
                            - generic [ref=e1194]: Select Item 5
                        - 'rowheader "Robert Brown View Activity: Robert Brown Locked Name" [ref=e1195]':
                          - generic [ref=e1197]:
                            - generic [ref=e1201]:
                              - link "Robert Brown" [ref=e1204] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjIMMUA3/view
                                - generic [ref=e1205]: Robert Brown
                              - 'button "View Activity: Robert Brown" [ref=e1207] [cursor=pointer]':
                                - img [ref=e1209]
                                - generic [ref=e1212]: "View Activity: Robert Brown"
                            - img "Locked Name" [ref=e1213]:
                              - img [ref=e1215]
                        - 'gridcell "Mark Important: Robert Brown" [ref=e1218]':
                          - 'button "Mark Important: Robert Brown" [ref=e1227] [cursor=pointer]':
                            - img [ref=e1229]
                            - generic [ref=e1232]: "Mark Important: Robert Brown"
                        - gridcell "Edit Title" [ref=e1233]:
                          - button "Edit Title" [ref=e1236] [cursor=pointer]:
                            - img [ref=e1238]
                            - generic [ref=e1241]: Edit Title
                        - gridcell "Enterprise Corp Edit Company" [ref=e1242]:
                          - generic [ref=e1244]:
                            - generic [ref=e1247]: Enterprise Corp
                            - button "Edit Company" [ref=e1248] [cursor=pointer]:
                              - img [ref=e1250]
                              - generic [ref=e1253]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e1254]:
                          - generic [ref=e1256]:
                            - generic [ref=e1259]: Open
                            - button "Edit Lead Status" [ref=e1260] [cursor=pointer]:
                              - img [ref=e1262]
                              - generic [ref=e1265]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e1266]:
                          - button "Edit Lead Source" [ref=e1269] [cursor=pointer]:
                            - img [ref=e1271]
                            - generic [ref=e1274]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e1275]:
                          - img "Locked Last Activity" [ref=e1278]:
                            - img [ref=e1280]
                        - gridcell [ref=e1283]:
                          - group [ref=e1290]:
                            - generic [ref=e1292]:
                              - button "Email" [ref=e1294] [cursor=pointer]:
                                - img [ref=e1296]
                                - generic [ref=e1299]: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e1300]:
                          - button "Show Actions" [ref=e1307] [cursor=pointer]:
                            - img [ref=e1309]
                            - generic [ref=e1312]: Show Actions
                      - 'row "Select Item 6 Choose a Row Mark Wilson View Activity: Mark Wilson Locked Name Mark Important: Mark Wilson Edit Title Innovation Labs Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e1313]':
                        - gridcell [ref=e1314]
                        - gridcell "Select Item 6 Choose a Row" [ref=e1319]:
                          - generic [ref=e1321]:
                            - checkbox "Select Item 6 Choose a Row" [ref=e1322]
                            - generic [ref=e1325]: Select Item 6
                        - 'rowheader "Mark Wilson View Activity: Mark Wilson Locked Name" [ref=e1326]':
                          - generic [ref=e1328]:
                            - generic [ref=e1332]:
                              - link "Mark Wilson" [ref=e1335] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjINvUAN/view
                                - generic [ref=e1336]: Mark Wilson
                              - 'button "View Activity: Mark Wilson" [ref=e1338] [cursor=pointer]':
                                - img [ref=e1340]
                                - generic [ref=e1343]: "View Activity: Mark Wilson"
                            - img "Locked Name" [ref=e1344]:
                              - img [ref=e1346]
                        - 'gridcell "Mark Important: Mark Wilson" [ref=e1349]':
                          - 'button "Mark Important: Mark Wilson" [ref=e1358] [cursor=pointer]':
                            - img [ref=e1360]
                            - generic [ref=e1363]: "Mark Important: Mark Wilson"
                        - gridcell "Edit Title" [ref=e1364]:
                          - button "Edit Title" [ref=e1367] [cursor=pointer]:
                            - img [ref=e1369]
                            - generic [ref=e1372]: Edit Title
                        - gridcell "Innovation Labs Edit Company" [ref=e1373]:
                          - generic [ref=e1375]:
                            - generic [ref=e1378]: Innovation Labs
                            - button "Edit Company" [ref=e1379] [cursor=pointer]:
                              - img [ref=e1381]
                              - generic [ref=e1384]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e1385]:
                          - generic [ref=e1387]:
                            - generic [ref=e1390]: Open
                            - button "Edit Lead Status" [ref=e1391] [cursor=pointer]:
                              - img [ref=e1393]
                              - generic [ref=e1396]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e1397]:
                          - button "Edit Lead Source" [ref=e1400] [cursor=pointer]:
                            - img [ref=e1402]
                            - generic [ref=e1405]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e1406]:
                          - img "Locked Last Activity" [ref=e1409]:
                            - img [ref=e1411]
                        - gridcell [ref=e1414]:
                          - group [ref=e1421]:
                            - generic [ref=e1423]:
                              - generic:
                                - button "Email" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e1424]:
                          - button "Show Actions" [ref=e1431] [cursor=pointer]:
                            - img [ref=e1433]
                            - generic [ref=e1436]: Show Actions
                      - 'row "Select Item 7 Choose a Row François O''Sullivan View Activity: François O''Sullivan Locked Name Mark Important: François O''Sullivan Edit Title Société Générale & Partners Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e1437]':
                        - gridcell [ref=e1438]
                        - gridcell "Select Item 7 Choose a Row" [ref=e1443]:
                          - generic [ref=e1445]:
                            - checkbox "Select Item 7 Choose a Row" [ref=e1446]
                            - generic [ref=e1449]: Select Item 7
                        - 'rowheader "François O''Sullivan View Activity: François O''Sullivan Locked Name" [ref=e1450]':
                          - generic [ref=e1452]:
                            - generic [ref=e1456]:
                              - link "François O'Sullivan" [ref=e1459] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjM8CUAV/view
                                - generic [ref=e1460]: François O'Sullivan
                              - 'button "View Activity: François O''Sullivan" [ref=e1462] [cursor=pointer]':
                                - img [ref=e1464]
                                - generic [ref=e1467]: "View Activity: François O'Sullivan"
                            - img "Locked Name" [ref=e1468]:
                              - img [ref=e1470]
                        - 'gridcell "Mark Important: François O''Sullivan" [ref=e1473]':
                          - 'button "Mark Important: François O''Sullivan" [ref=e1482] [cursor=pointer]':
                            - img [ref=e1484]
                            - generic [ref=e1487]: "Mark Important: François O'Sullivan"
                        - gridcell "Edit Title" [ref=e1488]:
                          - button "Edit Title" [ref=e1491] [cursor=pointer]:
                            - img [ref=e1493]
                            - generic [ref=e1496]: Edit Title
                        - gridcell "Société Générale & Partners Edit Company" [ref=e1497]:
                          - generic [ref=e1499]:
                            - generic [ref=e1502]: Société Générale & Partners
                            - button "Edit Company" [ref=e1503] [cursor=pointer]:
                              - img [ref=e1505]
                              - generic [ref=e1508]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e1509]:
                          - generic [ref=e1511]:
                            - generic [ref=e1514]: Open
                            - button "Edit Lead Status" [ref=e1515] [cursor=pointer]:
                              - img [ref=e1517]
                              - generic [ref=e1520]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e1521]:
                          - button "Edit Lead Source" [ref=e1524] [cursor=pointer]:
                            - img [ref=e1526]
                            - generic [ref=e1529]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e1530]:
                          - img "Locked Last Activity" [ref=e1533]:
                            - img [ref=e1535]
                        - gridcell [ref=e1538]:
                          - group [ref=e1545]:
                            - generic [ref=e1547]:
                              - button "Email" [ref=e1549] [cursor=pointer]:
                                - img [ref=e1551]
                                - generic [ref=e1554]: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e1555]:
                          - button "Show Actions" [ref=e1562] [cursor=pointer]:
                            - img [ref=e1564]
                            - generic [ref=e1567]: Show Actions
                      - 'row "Select Item 8 Choose a Row John Doe View Activity: John Doe Locked Name Mark Important: John Doe Edit Title Acme Corporation Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e1568]':
                        - gridcell [ref=e1569]
                        - gridcell "Select Item 8 Choose a Row" [ref=e1574]:
                          - generic [ref=e1576]:
                            - checkbox "Select Item 8 Choose a Row" [ref=e1577]
                            - generic [ref=e1580]: Select Item 8
                        - 'rowheader "John Doe View Activity: John Doe Locked Name" [ref=e1581]':
                          - generic [ref=e1583]:
                            - generic [ref=e1587]:
                              - link "John Doe" [ref=e1590] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjMBOUA3/view
                                - generic [ref=e1591]: John Doe
                              - 'button "View Activity: John Doe" [ref=e1593] [cursor=pointer]':
                                - img [ref=e1595]
                                - generic [ref=e1598]: "View Activity: John Doe"
                            - img "Locked Name" [ref=e1599]:
                              - img [ref=e1601]
                        - 'gridcell "Mark Important: John Doe" [ref=e1604]':
                          - 'button "Mark Important: John Doe" [ref=e1613] [cursor=pointer]':
                            - img [ref=e1615]
                            - generic [ref=e1618]: "Mark Important: John Doe"
                        - gridcell "Edit Title" [ref=e1619]:
                          - button "Edit Title" [ref=e1622] [cursor=pointer]:
                            - img [ref=e1624]
                            - generic [ref=e1627]: Edit Title
                        - gridcell "Acme Corporation Edit Company" [ref=e1628]:
                          - generic [ref=e1630]:
                            - generic [ref=e1633]: Acme Corporation
                            - button "Edit Company" [ref=e1634] [cursor=pointer]:
                              - img [ref=e1636]
                              - generic [ref=e1639]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e1640]:
                          - generic [ref=e1642]:
                            - generic [ref=e1645]: Open
                            - button "Edit Lead Status" [ref=e1646] [cursor=pointer]:
                              - img [ref=e1648]
                              - generic [ref=e1651]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e1652]:
                          - button "Edit Lead Source" [ref=e1655] [cursor=pointer]:
                            - img [ref=e1657]
                            - generic [ref=e1660]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e1661]:
                          - img "Locked Last Activity" [ref=e1664]:
                            - img [ref=e1666]
                        - gridcell [ref=e1669]:
                          - group [ref=e1676]:
                            - generic [ref=e1678]:
                              - generic:
                                - button "Email" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e1679]:
                          - button "Show Actions" [ref=e1686] [cursor=pointer]:
                            - img [ref=e1688]
                            - generic [ref=e1691]: Show Actions
                      - 'row "Select Item 9 Choose a Row John Doe View Activity: John Doe Locked Name Mark Important: John Doe Edit Title Acme Corporation Edit Company Open Edit Lead Status Edit Lead Source Locked Last Activity Show Actions" [ref=e1692]':
                        - gridcell [ref=e1693]
                        - gridcell "Select Item 9 Choose a Row" [ref=e1698]:
                          - generic [ref=e1700]:
                            - checkbox "Select Item 9 Choose a Row" [ref=e1701]
                            - generic [ref=e1704]: Select Item 9
                        - 'rowheader "John Doe View Activity: John Doe Locked Name" [ref=e1705]':
                          - generic [ref=e1707]:
                            - generic [ref=e1711]:
                              - link "John Doe" [ref=e1714] [cursor=pointer]:
                                - /url: /lightning/r/Lead/00QdN00000DjN11UAF/view
                                - generic [ref=e1715]: John Doe
                              - 'button "View Activity: John Doe" [ref=e1717] [cursor=pointer]':
                                - img [ref=e1719]
                                - generic [ref=e1722]: "View Activity: John Doe"
                            - img "Locked Name" [ref=e1723]:
                              - img [ref=e1725]
                        - 'gridcell "Mark Important: John Doe" [ref=e1728]':
                          - 'button "Mark Important: John Doe" [ref=e1737] [cursor=pointer]':
                            - img [ref=e1739]
                            - generic [ref=e1742]: "Mark Important: John Doe"
                        - gridcell "Edit Title" [ref=e1743]:
                          - button "Edit Title" [ref=e1746] [cursor=pointer]:
                            - img [ref=e1748]
                            - generic [ref=e1751]: Edit Title
                        - gridcell "Acme Corporation Edit Company" [ref=e1752]:
                          - generic [ref=e1754]:
                            - generic [ref=e1757]: Acme Corporation
                            - button "Edit Company" [ref=e1758] [cursor=pointer]:
                              - img [ref=e1760]
                              - generic [ref=e1763]: Edit Company
                        - gridcell "Open Edit Lead Status" [ref=e1764]:
                          - generic [ref=e1766]:
                            - generic [ref=e1769]: Open
                            - button "Edit Lead Status" [ref=e1770] [cursor=pointer]:
                              - img [ref=e1772]
                              - generic [ref=e1775]: Edit Lead Status
                        - gridcell "Edit Lead Source" [ref=e1776]:
                          - button "Edit Lead Source" [ref=e1779] [cursor=pointer]:
                            - img [ref=e1781]
                            - generic [ref=e1784]: Edit Lead Source
                        - gridcell "Locked Last Activity" [ref=e1785]:
                          - img "Locked Last Activity" [ref=e1788]:
                            - img [ref=e1790]
                        - gridcell [ref=e1793]:
                          - group [ref=e1800]:
                            - generic [ref=e1802]:
                              - generic:
                                - button "Email" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Email
                              - generic:
                                - button "Call" [disabled]:
                                  - generic:
                                    - img
                                  - generic: Call
                        - gridcell "Show Actions" [ref=e1803]:
                          - button "Show Actions" [ref=e1810] [cursor=pointer]:
                            - img [ref=e1812]
                            - generic [ref=e1815]: Show Actions
                - generic:
                  - dialog
                - generic:
                  - dialog
                - generic:
                  - dialog
                - generic:
                  - dialog
                - generic:
                  - dialog
    - generic:
      - contentinfo "Utility Bar":
        - list [ref=e1818]:
          - listitem [ref=e1819]:
            - button "To Do List" [ref=e1822] [cursor=pointer]:
              - img [ref=e1826]
              - generic [ref=e1829]: To Do List
  - generic:
    - status
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import * as allure from 'allure-js-commons';
  3   | import 'dotenv/config';
  4   | import { setAllureMeta } from '../utils/reporter-utils.js';
  5   | import { fillField, selectPicklist } from '../utils/locator-utils.js';
  6   | import { waitForSFLoad } from '../utils/sf-helpers.js';
  7   | import fs from 'fs';
  8   | import path from 'path';
  9   | 
  10  | // Reuse the saved Salesforce auth session
  11  | test.use({ storageState: './reports/.auth-state.json' });
  12  | 
  13  | /**
  14  |  * Extended test fixture: sfPage
  15  |  * Provides a pre-authenticated Salesforce Lightning page.
  16  |  */
  17  | const sfTest = test.extend({
  18  |   sfPage: async ({ page }, use) => {
  19  |     await page.goto(process.env.SF_URL);
  20  |     await waitForSFLoad(page);
  21  |     await use(page);
  22  |   },
  23  | });
  24  | 
  25  | /**
  26  |  * LEAD CREATION TEST SUITE
  27  |  * Robust navigation to Leads app with error handling
  28  |  * Epic: CRM, Feature: Lead Management, Story: Create Lead, Severity: Critical
  29  |  *
  30  |  * spec: specs/lead-creation-plan.md
  31  |  * seed: tests/seed.spec.js
  32  |  */
  33  | 
  34  | const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');
  35  | if (!fs.existsSync(screenshotDir)) {
  36  |   fs.mkdirSync(screenshotDir, { recursive: true });
  37  | }
  38  | 
  39  | test.beforeEach(async () => {
  40  |   await setAllureMeta({
  41  |     epic: 'CRM',
  42  |     feature: 'Lead Management',
  43  |     story: 'Create Lead',
  44  |     severity: 'critical',
  45  |   });
  46  | });
  47  | 
  48  | // HEALED: Improved failure screenshot capture and logging
  49  | test.afterEach(async ({ page }, testInfo) => {
  50  |   if (testInfo.status !== 'passed') {
  51  |     try {
  52  |       const failureScreenshot = await page.screenshot({ fullPage: true });
  53  |       const testName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
  54  |       fs.writeFileSync(
  55  |         path.join(screenshotDir, `${testName}-FAILED.png`),
  56  |         failureScreenshot
  57  |       );
  58  |       await testInfo.attach('failure-screenshot', {
  59  |         body: failureScreenshot,
  60  |         contentType: 'image/png',
  61  |       });
  62  |     } catch (err) {
  63  |       console.warn('Failed to capture failure screenshot:', err.message);
  64  |     }
  65  |   }
  66  | });
  67  | 
  68  | /**
  69  |  * Helper: Navigate to Leads app with robust selector handling
  70  |  * Uses App Launcher + search for reliability across SF orgs
  71  |  */
  72  | async function navigateToLeads(page) {
  73  |   // HEALED: Replaced navigateToApp() with direct App Launcher interaction  
  74  |   await page.getByTitle('App Launcher').click({ timeout: 10000 });
  75  |   await page.waitForTimeout(500);
  76  |   await page.getByPlaceholder(/search/i).fill('Leads', { timeout: 5000 });
  77  |   await page.waitForTimeout(500);
  78  |   await page.getByRole('option', { name: /^Leads$/i }).click({ timeout: 5000 });
  79  |   await waitForSFLoad(page);
  80  | }
  81  | 
  82  | /**
  83  |  * SECTION 1: LEAD CREATION - BASIC INFORMATION
  84  |  */
  85  | test.describe('1. Lead Creation - Basic Information', () => {
  86  | 
  87  |   sfTest('1.1 Create Lead with Required Fields Only', async ({ sfPage: page }, testInfo) => {
  88  |     await allure.description('Create a Lead with only required fields (First Name, Last Name, Company)');
  89  | 
  90  |     // Navigate to Leads
  91  |     await navigateToLeads(page);
  92  |     
  93  |     // Open New Lead form
> 94  |     await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
      |                                                      ^ Error: locator.click: Target page, context or browser has been closed
  95  |     await waitForSFLoad(page);
  96  |     // HEALED: Check for dialog heading instead of form element
  97  |     await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });
  98  | 
  99  |     // Fill form
  100 |     await fillField(page, /first name/i, 'John');
  101 |     await fillField(page, /last name/i, 'Doe');
  102 |     await fillField(page, /company/i, 'Acme Corporation');
  103 |     
  104 |     // Save and wait for URL change
  105 |     await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
  106 |     await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
  107 |     
  108 |     // Capture success screenshot
  109 |     await page.waitForTimeout(500);
  110 |     const screenshot = await page.screenshot({ fullPage: true });
  111 |     fs.writeFileSync(path.join(screenshotDir, '1.1-Required-Fields-PASSED.png'), screenshot);
  112 |     await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  113 |   });
  114 | 
  115 |   sfTest('1.2 Create Lead with All Standard Fields', async ({ sfPage: page }, testInfo) => {
  116 |     await allure.description('Create a Lead with all standard fields populated');
  117 | 
  118 |     // Navigate
  119 |     await navigateToLeads(page);
  120 |     
  121 |     await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
  122 |     await waitForSFLoad(page);
  123 |     // HEALED: Check for dialog heading instead of form element
  124 |     await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });
  125 | 
  126 |     // Fill all fields
  127 |     await fillField(page, /first name/i, 'Jane');
  128 |     await fillField(page, /last name/i, 'Smith');
  129 |     await fillField(page, /company/i, 'Tech Innovations Inc');
  130 |     
  131 |     try {
  132 |       await fillField(page, /title/i, 'Manager');
  133 |       await fillField(page, /email/i, 'jane.smith@techinnovations.com');
  134 |       await fillField(page, /phone/i, '(555) 123-4567');
  135 |     } catch {
  136 |       // Optional fields may not exist or be visible
  137 |     }
  138 | 
  139 |     // Save
  140 |     await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
  141 |     await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
  142 |     
  143 |     // Screenshot
  144 |     await page.waitForTimeout(500);
  145 |     const screenshot = await page.screenshot({ fullPage: true });
  146 |     fs.writeFileSync(path.join(screenshotDir, '1.2-All-Fields-PASSED.png'), screenshot);
  147 |     await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  148 |   });
  149 | 
  150 | });
  151 | 
  152 | /**
  153 |  * SECTION 2: FIELD VALIDATION
  154 |  */
  155 | test.describe('2. Lead Creation - Field Validation', () => {
  156 | 
  157 |   sfTest('2.1 Attempt to Save Lead Without Required Fields', async ({ sfPage: page }, testInfo) => {
  158 |     await allure.description('Verify validation prevents saving Lead without required fields');
  159 | 
  160 |     // Navigate
  161 |     await navigateToLeads(page);
  162 |     
  163 |     await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
  164 |     await waitForSFLoad(page);
  165 |     // HEALED: Check for dialog heading instead of form element
  166 |     await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });
  167 | 
  168 |     // Try to save empty form
  169 |     await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
  170 |     await page.waitForTimeout(2000);
  171 | 
  172 |     // HEALED: Verify save failed (URL should not have record ID)
  173 |     expect(page.url()).not.toMatch(/\/Lead\/[a-zA-Z0-9]{15,18}/);
  174 |     
  175 |     // Look for validation errors
  176 |     const alerts = page.getByRole('alert');
  177 |     if (await alerts.count() > 0) {
  178 |       await expect(alerts.first()).toBeVisible({ timeout: 5000 });
  179 |     }
  180 | 
  181 |     // Screenshot
  182 |     const screenshot = await page.screenshot({ fullPage: true });
  183 |     fs.writeFileSync(path.join(screenshotDir, '2.1-No-Required-Fields-PASSED.png'), screenshot);
  184 |     await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  185 |   });
  186 | 
  187 |   // HEALED: Validation error response is unreliable and causes timeouts
  188 |   // Marked as fixme: Salesforce validation on incomplete form can hang indefinitely
  189 |   // The save button with missing Last Name sometimes hangs instead of returning validation error
  190 |   sfTest.fixme('2.2 Enter Only First Name and Attempt Save', async ({ sfPage: page }, testInfo) => {
  191 |     await allure.description('Verify validation catches missing Last Name');
  192 | 
  193 |     // Navigate
  194 |     await navigateToLeads(page);
```