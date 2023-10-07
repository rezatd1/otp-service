import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {

    const [showAddToHomeScreenBanner, setShowAddToHomeScreenBanner] = useState(false);
    const [beforeInstallPromptEventData, setBeforeInstallPromptEventData] = useState(null);


    useEffect(() => {
        let iphone = /iPad|iPhone|iPod/;
        let isIphone = iphone.test(navigator.userAgent) && !window.MSStream;
        if (!window.matchMedia('(display-mode: standalone)').matches) {
            isIphone && setShowAddToHomeScreenBanner(true);
            window.addEventListener('beforeinstallprompt', (event) => {
                event.preventDefault();
                setBeforeInstallPromptEventData(event.target);
                setShowAddToHomeScreenBanner(true);
            });
        }
    }, [])

    const acceptButtonClicked = (e) => {
        beforeInstallPromptEventData.prompt();
        setShowAddToHomeScreenBanner(false);
        window.removeEventListener('beforeinstallprompt', () => {
            setBeforeInstallPromptEventData(null);
        })
    }

    const closeModal = () => {
        setShowAddToHomeScreenBanner(false);
        window.removeEventListener('beforeinstallprompt', () => {
            setBeforeInstallPromptEventData(null);
        })
    }

    function pwaClicked() {
        // console.log('navigator', navigator.geolocation.getCurrentPosition(callBack()));

        // navigator.geolocation.getCurrentPosition(function (position) {
        //     console.log('Latitude: ' + position.coords.latitude);
        //     console.log('Longitude: ' + position.coords.longitude);
        // });

        navigator.permissions.query({ name: 'contacts' })
            .then(function (permissionStatus) {
                if (permissionStatus.state === 'granted') {
                    // دسترسی به اسمس‌های مخاطب درخواست شده و تأیید شده است.
                    // ادامه کار با اسمس‌های مخاطب
                    console.log(permissionStatus);
                } else if (permissionStatus.state === 'prompt') {
                    // درخواست مجوز اسمس‌های مخاطب به کاربر نمایش داده شده است.
                    // کاربر باید تصمیم بگیرد.
                } else {
                    // کاربر اجازه دسترسی به اسمس‌های مخاطب را ندهید.
                }
            })
            .catch(function (error) {
                console.error('Error requesting permission: ' + error);
            });

        if ('contacts' in navigator) {

            navigator.contacts.select(['name', 'email', 'phone'])
                .then(function (contacts) {
                    document.getElementById('result').innerHTML = `${contacts}`;
                    // لیست اسمس‌های مخاطب در contacts قرار دارد.
                    // ادامه کار با اسمس‌های مخاطب
                })
                .catch(function (error) {
                    document.getElementById('result').innerHTML = 'Error selecting contacts: ' + error;
                });
        } else {
            document.getElementById('result').innerHTML = 'Contacts API is not supported in this browser.';
        }




    }
    return (
        <div>

            <button className="primary mt-5" onClick={pwaClicked} >get access</button>
            <button className="primary mt-5" onClick={acceptButtonClicked} >install</button>
            <button className="secondary mt-2" onClick={closeModal} >cancel</button>
            <div id='result'></div>
        </div>
    );
};

export default App;