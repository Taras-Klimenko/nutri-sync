
import {useAppDispatch, useAppSelector} from "../../redux/store/hooks.ts";
import {useEffect} from "react";
import {getCurators} from "../../redux/store/thunkActions.ts";
import MyButton from "../MyButton/MyButton.tsx";
import {Link} from "react-router-dom";

export default function AllCurator() {
    const dispatch = useAppDispatch()
    const {curators} = useAppSelector((store) => store.clientSlice)

    useEffect(() => {
        dispatch(getCurators());
    }, [dispatch]);
    return (
        <div>
            <label>
                Curators:
                    {curators &&
                        curators.map((curator) => (
                            <div key={curator.id} value={curator.id}>
                                {curator.login},
                                {curator.name}
                                {curator.email}
                            </div>
                        ))}
            </label>
            <Link to = '/reg'>
            <MyButton>
                Add Curator
            </MyButton>
            </Link>
        </div>
    )
};
