type theme = {
    primary:string
    secondary:string
    btn_primary_normal:string
    btn_primary_hover:string
    btn_primary_active:string
    btn_primary_disabled:string
    btn_outlined_hover:string
    btn_outlined_active:string
    btn_outlined_disabled:string
    btn_danger_normal:string
    btn_danger_hover:string
    btn_danger_active:string
    btn_danger_outlined_hover:string
    btn_danger_outlined_active:string
    text_main:string
    text_active:string
    text_inactive:string
    elephant_gray:string
    elephant_contrast:string,
    error:string
}

export interface ITenant{
    id:string,
    name:string,
    theme?:theme
}