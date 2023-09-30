export const valueExist = (value: any) : boolean => {
    if(value === null || value === undefined) {
        return false;
    }

    return true;
}