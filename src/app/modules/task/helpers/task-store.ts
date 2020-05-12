import { tassign } from 'tassign';
import { GlobalConstant } from '../../_shared/constants/global.constant';

export interface ITaskstate {
    taskList: any[];
}

export const TASK_INITIAL_STATE: ITaskstate = {
    taskList: []
};

export function taskingReducer(
    state: ITaskstate = TASK_INITIAL_STATE,
    action
): ITaskstate {
    switch (action.type) {
        case GlobalConstant.ADD_TASK:
            const task = {
                id: state.taskList.length + 1,
                taskname: action.taskname
            };
            return tassign(state, {
                taskList: state.taskList.concat(task)
            });

        case GlobalConstant.REMOVE_TASK:
            return tassign(state, {
                taskList: state.taskList.filter(
                    t => t.taskname !== action.taskname
                )
            });
    }

    return state;
}
