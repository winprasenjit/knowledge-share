import { combineReducers } from 'redux';
import {
    ITaskstate,
    TASK_INITIAL_STATE,
    taskingReducer
} from '../../task/helpers/task-store';

export interface IAppstate {
    tasking: ITaskstate;
    // imageing: IImagestate,
    // posting : IPoststate,
    // replies : IReplyPostState
}

export const INITIAL_STATE: IAppstate = {
    tasking: TASK_INITIAL_STATE
    /*  imageing: IMAGE_INITIAL_STATE,
    posting : POST_INITIAL_STATE,
    replies: REPLY_POST_INITIAL */
};

export const rootReducer = combineReducers<IAppstate>({
    tasking: taskingReducer
    /* imageing: imagingReducer,
    posting : postReducer,
    replies: replyPostReducer */
});
