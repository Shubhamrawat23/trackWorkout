import supabase from "@/lib/supabaseClient";

export function userWktInfo(){

    const wktData = async (user_id)=>{
        let {data, error}  = await supabase
                            .from('split_info')
                            .select(`
                                    *,
                                    wkt_splits(name, code,
                                        user_workout_info(id, wkt_split_id,
                                            user_personal_info(id, user_id)
                                        )
                                    )
                                    `)
                            .eq('wkt_splits.user_workout_info.user_personal_info.user_id',user_id);

                            if(error) return console(error.message);
                            return data;
    }

    return {
        wktData,
    };
}