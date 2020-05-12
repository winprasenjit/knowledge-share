import { tassign } from 'tassign';
import { GlobalConstant } from '../../../constants/global.constant';

export interface IImagestate {
    imageList: any[];
}

export const IMAGE_INITIAL_STATE: IImagestate = {
    imageList: []
};

export function imagingReducer(
    state: IImagestate = IMAGE_INITIAL_STATE,
    action
): IImagestate {
    switch (action.type) {
        case GlobalConstant.ADD_IMAGE:
            const image = {
                id: state.imageList.length + 1,
                imageUrl: action.imageUrl
            };
            return tassign(state, {
                imageList: state.imageList.concat(image)
            });

        case GlobalConstant.REMOVE_IMAGE:
            return tassign(state, {
                imageList: state.imageList.filter(
                    t => t.taskname !== action.taskname
                )
            });
    }

    return state;
}
