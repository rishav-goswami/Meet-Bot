


//  let joinNow = document.querySelectorAll('.NPEfkd')[0];
//  let mic_OnOff = document.getElementsByClassName('U26fgb')[0];
//  let cam_OnOff = document.getElementsByClassName('U26fgb')[1];
// let end_meet = document.getElementsByClassName('VfPpkd-Bz112c-LgbsSe')[4];
// let cnf_just_leave_meet = document.getElementsByClassName("VfPpkd-LgbsSe")[1];
// let cnf_end_for_everyone = document.getElementsByClassName("VfPpkd-LgbsSe")[2];
// let on_meet_mic_OnOff = document.getElementsByClassName('VfPpkd-Bz112c-LgbsSe')[0];
// let on_meet_cam_OnOff = document.getElementsByClassName('VfPpkd-Bz112c-LgbsSe')[1];

join_meeting();

function join_meeting() {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    delay(500);
    let joinNow = document.querySelectorAll('.NPEfkd')[0];
    let mic_OnOff = document.getElementsByClassName('U26fgb')[0];
    let cam_OnOff = document.getElementsByClassName('U26fgb')[1];
    let cut_setting = document.getElementsByClassName("VfPpkd-kBDsod")[1];

    try {

        mic_OnOff.click();
        delay(100);
        cam_OnOff.click();
        delay(100);
        cut_setting.click();
        delay(100);
        joinNow.click();


    }
    catch (e) {
        console.log(e);
    }

    setTimeout(() => {
        end_meeting();
    }, 30000); // meeting ending time
}

function end_meeting() {

    let end_meet = document.getElementsByClassName('VfPpkd-Bz112c-LgbsSe')[5];

    try {
        end_meet.click();
    } catch (e) {
        console.log(e);
    }
}
