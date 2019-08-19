import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        machines: [
            {
                name: 'Brushless Drill',
                status: 'up',
                id: 1,
                data: [
                    {
                        workOrderId: '123',
                        id: 80,
                        sku: '04081962',
                        status: 'green',
                        maintenance: true,
                        offset: 2,
                        length: 8
                    },
                    {
                        workOrderId: '222',
                        id: 81,
                        sku: '04081962',
                        status: 'red',
                        offset: 24,
                        length: 12
                    }
                ]
            },
            {
                name: 'Sample Machine',
                status: 'down',
                id: 2,
                data: [
                    {
                        workOrderId: 123,
                        id: 82,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        id: 83,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 16
                    },
                    {
                        workOrderId: 'A472',
                        id: 84,
                        sku: '04081962',
                        status: 'grey',
                        offset: 25,
                        length: 8
                    }
                ]
            },
            {
                name: 'Hair Dryer',
                status: 'maintenance',
                id: 3,
                data: [
                    {
                        workOrderId: 123,
                        id: 85,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 5
                    },
                    {
                        workOrderId: 222,
                        id: 86,
                        sku: '04081962',
                        status: 'green',
                        offset: 7,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        id: 87,
                        sku: '04081962',
                        status: 'grey',
                        offset: 12,
                        length: 8
                    }
                ]
            },
            {
                name: 'Blue Yeti Microphone',
                status: 'up',
                id: 4,
                data: [
                    {
                        workOrderId: 123,
                        id: 88,
                        sku: '04081962',
                        status: 'green',
                        offset: 2,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        id: 89,
                        sku: '04081962',
                        status: 'red',
                        offset: 6,
                        length: 3
                    }
                ]
            },
            {
                name: 'Lucky the Cat',
                status: 'down',
                id: 5,
                data: [
                    {
                        workOrderId: 123,
                        id: 90,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        id: 91,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 4
                    },
                    {
                        workOrderId: 'A472',
                        id: 92,
                        sku: '04081962',
                        status: 'grey',
                        offset: 13,
                        length: 2
                    },
                    {
                        workOrderId: 'id42',
                        id: 93,
                        sku: '04081962',
                        status: 'red',
                        offset: 18,
                        length: 3
                    }
                ]
            },
            {
                name: 'Nalgene Bottle',
                status: 'maintenance',
                id: 6,
                data: [
                    {
                        workOrderId: 123,
                        id: 94,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 20
                    },
                    {
                        workOrderId: 222,
                        id: 95,
                        sku: '04081962',
                        status: 'green',
                        offset: 27,
                        length: 3
                    }
                ]
            },
            {
                name: 'ultima',
                status: 'up',
                id: 7,
                data: [
                    {
                        workOrderId: '123',
                        id: 96,
                        sku: '04081962',
                        status: 'green',
                        maintenance: true,
                        offset: 2,
                        length: 8
                    },
                    {
                        workOrderId: '222',
                        id: 97,
                        sku: '04081962',
                        status: 'red',
                        offset: 24,
                        length: 12
                    }
                ]
            },
            {
                name: 'Computer Glasses',
                status: 'down',
                id: 8,
                data: [
                    {
                        workOrderId: 123,
                        id: 98,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        id: 99,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 16
                    },
                    {
                        workOrderId: 'A472',
                        id: 100,
                        sku: '04081962',
                        status: 'grey',
                        offset: 25,
                        length: 8
                    }
                ]
            },
            {
                name: 'StarTech Hub',
                status: 'maintenance',
                id: 9,
                data: [
                    {
                        workOrderId: 123,
                        id: 101,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 5
                    },
                    {
                        workOrderId: 222,
                        id: 102,
                        sku: '04081962',
                        status: 'green',
                        offset: 7,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        id: 103,
                        sku: '04081962',
                        status: 'grey',
                        offset: 12,
                        length: 8
                    }
                ]
            },
            {
                name: 'Samsung Tablet',
                status: 'up',
                id: 10,
                data: [
                    {
                        workOrderId: 123,
                        id: 104,
                        sku: '04081962',
                        status: 'green',
                        offset: 2,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        id: 105,
                        sku: '04081962',
                        status: 'red',
                        offset: 6,
                        length: 3
                    }
                ]
            },
            {
                name: 'Livesavers',
                status: 'down',
                id: 11,
                data: [
                    {
                        workOrderId: 123,
                        id: 106,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        id: 107,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 4
                    },
                    {
                        workOrderId: 'A472',
                        id: 108,
                        sku: '04081962',
                        status: 'grey',
                        offset: 13,
                        length: 2
                    },
                    {
                        workOrderId: 'id42',
                        id: 109,
                        sku: '04081962',
                        status: 'red',
                        offset: 18,
                        length: 3
                    }
                ]
            },
            {
                name: 'Power Outlet',
                status: 'maintenance',
                id: 12,
                data: [
                    {
                        workOrderId: 123,
                        id: 110,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 20
                    },
                    {
                        workOrderId: 222,
                        id: 111,
                        sku: '04081962',
                        status: 'green',
                        offset: 27,
                        length: 3
                    }
                ]
            },
            {
                name: 'Dasani Water',
                status: 'up',
                id: 13,
                data: [
                    {
                        workOrderId: '123',
                        id: 112,
                        sku: '04081962',
                        status: 'green',
                        maintenance: true,
                        offset: 2,
                        length: 8
                    },
                    {
                        workOrderId: '222',
                        id: 113,
                        sku: '04081962',
                        status: 'red',
                        offset: 24,
                        length: 12
                    }
                ]
            },
            {
                name: 'Miso Soup',
                status: 'down',
                id: 14,
                data: [
                    {
                        workOrderId: 123,
                        id: 114,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        id: 115,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 16
                    },
                    {
                        workOrderId: 'A472',
                        id: 116,
                        sku: '04081962',
                        status: 'grey',
                        offset: 25,
                        length: 8
                    }
                ]
            },
            {
                name: 'Lalit',
                status: 'maintenance',
                id: 15,
                data: [
                    {
                        workOrderId: 123,
                        id: 117,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 5
                    },
                    {
                        workOrderId: 222,
                        id: 118,
                        sku: '04081962',
                        status: 'green',
                        offset: 7,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        id: 119,
                        sku: '04081962',
                        status: 'grey',
                        offset: 12,
                        length: 8
                    }
                ]
            },
            {
                name: 'Spoon',
                status: 'up',
                id: 16,
                data: [
                    {
                        workOrderId: 123,
                        id: 120,
                        sku: '04081962',
                        status: 'green',
                        offset: 2,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        id: 121,
                        sku: '04081962',
                        status: 'red',
                        offset: 6,
                        length: 3
                    }
                ]
            },
            {
                name: 'Soup Bowl',
                status: 'down',
                id: 17,
                data: [
                    {
                        workOrderId: 123,
                        id: 122,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        id: 123,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 4
                    },
                    {
                        workOrderId: 'A472',
                        id: 124,
                        sku: '04081962',
                        status: 'grey',
                        offset: 13,
                        length: 2
                    },
                    {
                        workOrderId: 'id42',
                        id: 125,
                        sku: '04081962',
                        status: 'red',
                        offset: 18,
                        length: 3
                    }
                ]
            },
            {
                name: 'Stapler',
                status: 'maintenance',
                id: 18,
                data: [
                    {
                        workOrderId: 123,
                        id: 126,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 20
                    },
                    {
                        workOrderId: 222,
                        id: 127,
                        sku: '04081962',
                        status: 'green',
                        offset: 27,
                        length: 3
                    }
                ]
            }
        ]
    },
    mutations: {
        MOVE_JOB(state, { jobId, fromMachine, toMachine, offset }) {
            // get job to move and update the offset
            const jobToMove = state.machines
                .find(machine => machine.id === fromMachine)
                .data.find(job => job.id === jobId);
            jobToMove.offset = offset - 1;

            // remove job from current machine
            const index = state.machines
                .find(machine => machine.id === fromMachine)
                .data.findIndex(job => job.id === jobId);
            state.machines
                .find(machine => machine.id === fromMachine)
                .data.splice(index, 1);

            // move job to new machine
            state.machines
                .find(machine => machine.id === +toMachine)
                .data.push(jobToMove);
        }
    },
    actions: {}
});
