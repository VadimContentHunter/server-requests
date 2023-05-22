import { ServerRequests } from './ServerRequests.js';
import { RequestBase } from './requests/RequestBase.js';
import { RequestForms } from './requests/RequestForms.js';

const serverRequest = new ServerRequests();
serverRequest.eventRegistration('eventFetchRequestForm', new RequestForms());
serverRequest.eventRegistration('eventFetchRequestBase', new RequestBase());
// serverRequest.request('eventFetchRequestForm');

const allForms = document.querySelectorAll('form');
allForms.forEach((form) => {
    if (form instanceof HTMLFormElement) {
        const button = form.querySelector('input[type="button"]');
        if (button instanceof HTMLInputElement) {
            button.addEventListener('click', (event) => {
                serverRequest.request('eventFetchRequestForm', {
                    formElem: form,
                    method: 'POST',
                    requestDataPacker: (valueObject) => {
                        // console.log(valueObject);
                        return valueObject;
                    },
                    responseHandler: (valueJson) => {
                        console.log(valueJson);
                    },
                });
            });
        }
    }
});

serverRequest.request('eventFetchRequestBase', {
    url: '/test/1',
    method: 'GET',
    objectForDataPacker: {
        test_id: '001',
        title: 'test title',
    },
    requestDataPacker: (valueObject) => {
        console.log('requestDataPacker: ');
        console.log(valueObject);
        return valueObject;
    },
    responseHandler: (valueJson) => {
        console.log('responseHandler: ');
        console.log(valueJson);
    },
});
