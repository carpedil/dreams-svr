INSERT INTO "module" ("Uri","Name") values ('/tracking','Tracking');
INSERT INTO "module" ("Uri","Name") values ('/tempoary','Tempoary');
INSERT INTO "module" ("Uri","Name") values ('/transport','Transport');
INSERT INTO "module" ("Uri","Name") values ('/update','Update');
INSERT INTO "module" ("Uri","Name") values ('/view','View');
INSERT INTO "module" ("Uri","Name") values ('/pfbs','PFBS');
INSERT INTO "module" ("Uri","Name") values ('/cfbs','CFBS');
INSERT INTO "module" ("Uri","Name") values ('/equipment','Equipment');
INSERT INTO "module" ("Uri","Name") values ('/other','Other');
INSERT INTO "module" ("Uri","Name") values ('/oqa','OQA');
INSERT INTO "module" ("Uri","Name") values ('/misc','Misc');


INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/jpre'  ,'Job Prepare','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/jprec'  ,'Job Prepare Cancel','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/ji'  ,'Job In','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/jic'  ,'Job In Cancel','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/dcol'  ,'Data Collection','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/jo'  ,'Job Out','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/nonlotdc'  ,'Non Lot Dcoll','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/nonlotjic'  ,'Non Lot Job In Cancel','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/mvloc'  ,'Move To Location','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/bankout'  ,'Bank Out','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/backup'  ,'Back Up','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/skip'  ,'Skip','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/hold'  ,'Hold','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/runhold'  ,'Run Hold','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/release'  ,'Release','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/rework'  ,'Rework','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/merge'  ,'Merge','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/split'  ,'Split','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/presplit'  ,'Prepare Split','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/split-rework'  ,'Split-Rework','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/brokenwafer'  ,'Broken Wafer Procedure','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/altop'  ,'Eap Choose Alt Operation','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/eocap'  ,'EOCAP','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/lotstart'  ,'Lot Start','/tracking');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tracking/lotstartnew'  ,'Lot Start New','/tracking');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/tempoary/wrc'  ,'Wrc New Part','/tempoary');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/transport/shopfloor' ,'Shopfloor Query','/transport');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/update/lot'    ,'Update Lot','/update');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/update/lotcmt'    ,'Update Lot Comment','/update');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/update/eqprunlot'    ,'Update Eqp Running Lot List','/update');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/update/pwd'    ,'Change Password','/update');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/update/taginfo'    ,'Taginfo Update','/update');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/update/taginfolot'    ,'Taginfo Update Lot','/update');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/update/taginfodmylot'    ,'Taginfo Update Dummy Lot','/update');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/view/runstatus'      ,'Run Status Inquiry','/view');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/view/eqpstatus'      ,'Eqp Status Inquiry','/view');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/view/nonlotreport'      ,'Non Lot Generally Report','/view');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/view/futurehold'      ,'View Future Hold Lot','/view');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/view/gotoweb'      ,'Go To Web','/view');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/pfbs/ji'      ,'PFBS Job In','/pfbs');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/pfbs/jic'      ,'PFBS Job In Cancel','/pfbs');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/pfbs/dcol'      ,'PFBS Data Collection','/pfbs');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/pfbs/jo'      ,'PFBS Job Out','/pfbs');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/cfbs/ji'      ,'CFBS Job In','/cfbs');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/cfbs/jic'      ,'CFBS Job In Cancel','/cfbs');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/cfbs/dcol'      ,'CFBS Data Collection','/cfbs');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/cfbs/jo'      ,'CFBS Job Out','/cfbs');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/equipment/changestatus' ,'Equipment Status Change','/equipment');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/dispatch'     ,'Dispatch Query & Pull','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtclstatqry'     ,'Reticle Status Query','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtcltakeout'     ,'Reticle Takeout/Return','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtcleqp'     ,'Reticle/EqpId Maint.','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtclpart'     ,'Reticle/PartId Maint.','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtclpartqry'     ,'Reticle/PartId Query','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtclhistqry'     ,'Reticle Hist Query','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtclrtn'     ,'Reticle Return Confirmation','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtclstaus'     ,'Reticle Status Change','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtclacc'     ,'Reticle Acceptance','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtcluser'     ,'Reticle User Maint.','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/rtcllot'     ,'Reticle Query Lot-Reticle','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/prodreticle'     ,'View PROD Reticle','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/lotmask'     ,'Lot Mask','/other');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/other/lotmaskqry'     ,'Lot Mask Query','/other');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/oqa/split'       ,'SPDN Split','/oqa');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/oqa/query'       ,'SPDN Query','/oqa');
INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/oqa/spec'       ,'SPDN Spec','/oqa');

INSERT INTO "functions" ("Uri","Name","ModuleUri") values ('/misc/eap'      ,'GO EAP','/misc');

