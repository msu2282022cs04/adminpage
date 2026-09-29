/**
 * THAMILI Admin Dashboard - Complete Bilingual i18n Dictionary & Engine
 * Default Language: 'ta' (தமிழ்)
 * Strict 100% Tamil in Tamil Mode & Strict 100% English in English Mode.
 */

const THAMILI_TRANSLATIONS = {
  ta: {
    // Brand & Sidebar
    brand_name: "தமிழி",
    brand_sub: "செயற்கை நுண்ணறிவு",
    sidebar_quote: "\"தமிழின் சிறந்த AI உலகம்...\"",
    admin_title: "முதன்மை நிர்வாகி",
    admin_name: "நிர்வாகி",

    // Sidebar Navigation
    nav_home: "முகப்பு",
    nav_users: "பயனர் மேலாண்மை",
    nav_ai_tools: "AI கருவிகள்",
    nav_ai_usage: "AI பயன்பாடு",
    nav_settings: "அமைப்புகள்",
    nav_language: "மொழி அமைப்பு",
    nav_reports: "தகவல் அறிக்கைகள்",
    nav_feedback: "பயனர் கருத்துக்கள்",

    // Sidebar Submenus
    sub_home_overview: "செயல்பாட்டு பலகை",
    sub_home_analytics: "பயன்பாட்டு புள்ளிவிவரங்கள்",
    sub_home_quick: "விரைவு இணைப்புகள்",

    sub_users_list: "பயனர் பட்டியல்",
    sub_users_add: "புதிய பயனர் சேர்",
    sub_users_roles: "பயனர் அனுமதிகள்",
    sub_users_blocked: "தடை செய்யப்பட்டவர்கள்",

    sub_ai_chat: "AI முகவர்",
    sub_ai_image: "பட உருவாக்கம்",
    sub_ai_video: "காணொளிக் கருவிகள்",
    sub_ai_code: "பொதுத் தேடல்",
    sub_ai_audio: "ஒலிக் கருவிகள்",
    sub_ai_content: "ஆராய்ச்சி",

    sub_ai_usage_stats: "பயன்பாட்டு புள்ளிவிவரங்கள்",
    sub_ai_usage_tools: "கருவிகள் பகுப்பாய்வு",
    sub_ai_usage_activity: "சமீபத்திய செயல்பாடுகள்",

    sub_settings_general: "பொது அமைப்புகள்",
    sub_settings_security: "பாதுகாப்பு அமைப்புகள்",
    sub_settings_api: "இணைப்பு விசைகள்",
    sub_settings_notifications: "அறிவிப்புகள்",

    sub_lang_tamil: "தமிழ் அமைப்புகள்",
    sub_lang_fonts: "எழுத்துரு அமைப்புகள்",
    sub_lang_dict: "மொழிபெயர்ப்பு & சொற்களஞ்சியம்",

    sub_reports_users: "பயனர் புள்ளிவிவரங்கள்",
    sub_reports_ai: "AI பயன்பாட்டு அறிக்கை",
    sub_reports_perf: "செயல்திறன் சுருக்கம்",
    sub_reports_export: "பதிவிறக்கம்",

    sub_feedback_recent: "சமீபத்திய பயனர் கருத்துக்கள்",
    sub_feedback_ratings: "மதிப்பீடுகள் & விமர்சனங்கள்",
    sub_feedback_support: "உதவி கோரிக்கைகள்",

    // Header Elements
    search_placeholder: "தேடுங்கள்...",
    lang_ta: "தமிழ்",
    lang_en: "English",
    date_format_locale: "ta-IN",
    profile_menu_profile: "சுயவிவரம்",
    profile_menu_edit: "சுயவிவரத்தைத் திருத்து",
    profile_menu_password: "கடவுச்சொல் மாற்று",
    profile_menu_logout: "வெளியேறு",

    // Hero Banner
    hero_badge: "நிர்வாகி செயல்பாட்டு பலகை",
    hero_title: "தமிழி AI மையம்",
    hero_desc: "தமிழ் மொழியில் உலகளாவிய தொழில்நுட்பம் உங்கள் கைகளில்...",
    hero_slogan: "உங்கள் மொழி எங்கள் தொழில்நுட்பம்",
    hero_btn: "AI கருவிகளுக்குச் செல்ல",

    // Quick Access Section
    quick_access_title: "விரைவான அணுகல்",
    quick_access_sublink: "AI கருவிகளை நேரடியாகப் பயன்படுத்துங்கள்",

    // 6 Quick Access Cards
    card_chat_title: "AI உரையாடல்",
    card_chat_desc: "அனைத்து விதமான கேள்விகளுக்கும் தமிழ் மொழியில் உடனடி துல்லியமான பதில்கள்",
    card_chat_user_desc: "தமிழ் அல்லது ஆங்கிலத்தில் AI உடன் உரையாடவும்",

    card_video_title: "காணொளிக் கருவிகள்",
    card_video_desc: "காணொளிகளை உருவாக்க, திருத்த மற்றும் மேம்படுத்த உதவும் கருவிகள்",
    card_video_user_desc: "AI மூலம் வீடியோக்களை உருவாக்கவும் திருத்தவும்",

    card_image_title: "பட உருவாக்கம்",
    card_image_desc: "உங்கள் கற்பனையை வண்ணப் படங்களாக உருவாக்கும் கருவிகள்",
    card_image_user_desc: "AI மூலம் படங்களை உருவாக்கவும் திருத்தவும்",

    card_code_title: "நிரலாக்கக் கருவிகள்",
    card_code_desc: "நிரல் குறியீடுகளை எழுத, பிழைதிருத்த மற்றும் இயக்க உதவும் கருவிகள்",
    card_code_user_desc: "Frontend, Backend மற்றும் Full-Stack நிரல்களை உருவாக்கவும்",

    card_audio_title: "ஒலிக் கருவிகள்",
    card_audio_desc: "குரல் மாற்றம், உரை ஒலி மாற்றம் மற்றும் மொழிபெயர்ப்பு உதவிகள்",
    card_audio_user_desc: "AI மூலம் குரல் மற்றும் ஆடியோ உருவாக்கவும்",

    card_content_title: "உள்ளடக்கக் கருவிகள்",
    card_content_desc: "ஆவணங்கள், கட்டுரைகள், சுருக்கங்கள் மற்றும் மொழிபெயர்ப்பு உதவிகள்",
    card_content_user_desc: "கட்டுரைகள், ஸ்கிரிப்ட்கள், சமூக ஊடக பதிவுகள் உருவாக்கவும்",

    btn_back_to_tools: "அனைத்து AI கருவிகள்",
    btn_all_tools: "அனைத்து AI கருவிகள்",
    quick_overview_title: "தமிழி AI கருவிகளின் சிறப்பம்சங்கள்",
    side_ai_status_title: "AI பொறிமுறை நிலை",

    // Platform Usage Chart
    chart_title: "தளம் பயன்பாடு",
    chart_subtitle_suffix: "(கடைசி 7 நாட்கள்)",
    chart_filter_7d: "7 நாட்கள்",
    chart_filter_30d: "30 நாட்கள்",
    chart_filter_90d: "3 மாதங்கள்",
    chart_tooltip_users: "பயனர்கள்",
    chart_days: ["13 செப்", "14 செப்", "15 செப்", "16 செப்", "17 செப்", "18 செப்", "19 செப்"],

    // Key Statistics (Right Column Top)
    stats_title: "முக்கிய புள்ளிவிவரங்கள்",
    stat_registered_users: "பதிவு செய்த பயனர்கள்",
    stat_registered_count: "1,248",
    stat_registered_trend: "+ 12%",

    stat_site_visitors: "தளம் பார்த்தவர்கள்",
    stat_visitors_count: "8,932",
    stat_visitors_trend: "+ 18%",

    stat_active_users: "செயலில் உள்ள பயனர்கள்",
    stat_active_count: "236",
    stat_active_trend: "+ 6%",

    // Recent Activities (Right Column Middle)
    activity_title: "சமீபத்திய செயல்பாடுகள்",
    activity_view_all: "அனைத்தும்",
    act_1_title: "புதிய பயனர் பதிவு செய்தார்",
    act_1_desc: "saravanan123@example.com",
    act_1_time: "காலை 09:42",

    act_2_title: "AI கருவி பயன்படுத்தப்பட்டது",
    act_2_desc: "தமிழ் உரை உருவாக்கம்",
    act_2_time: "காலை 08:58",

    act_3_title: "புதிய உள்ளடக்கம் சேர்க்கப்பட்டது",
    act_3_desc: "காணொளிக் கருவிகள்",
    act_3_time: "காலை 08:21",

    act_4_title: "தளம் பார்க்கப்பட்டது",
    act_4_desc: "பயனர் முகப்பு - தமிழ்",
    act_4_time: "காலை 07:45",

    act_5_title: "அமைப்புகள் மாற்றப்பட்டது",
    act_5_desc: "மொழி அமைப்பு - தமிழ்",
    act_5_time: "காலை 07:30",

    // Bottom Badges
    badge_security_title: "பாதுகாப்பான தளம்",
    badge_security_desc: "உங்கள் தரவு எங்கள் பொறுப்பு",

    badge_speed_title: "வேகமான செயல்பாடு",
    badge_speed_desc: "நவீன தொழில்நுட்பம்",

    badge_purpose_title: "தமிழுக்காக",
    badge_purpose_desc: "உலகளாவிய அணுகல்",

    // Promo Card (Right Column Bottom)
    promo_title: "தமிழ் பேசும் AI உலகம்...",
    promo_desc: "நாம் இணைந்து உருவாக்குவோம் ஒரு சிறந்த எதிர்காலத்தை!",
    promo_btn: "AI கருவிகளைப் பயன்படுத்துக",

    // Modals & Notifications
    modal_profile_title: "நிர்வாகி சுயவிவரம்",
    modal_edit_profile_title: "சுயவிவரத்தைத் திருத்து",
    modal_change_pwd_title: "கடவுச்சொல் மாற்று",
    modal_logout_title: "வெளியேற உறுதிப்படுத்தவும்",
    modal_logout_desc: "நிர்வாக அமர்விலிருந்து வெளியேற விரும்புகிறீர்களா?",
    btn_save: "சேமிக்கவும்",
    btn_cancel: "ரத்து செய்",
    btn_close: "மூடு",
    btn_confirm: "உறுதி செய்",
    btn_logout: "வெளியேறு",
    btn_edit_profile: "சுயவிவரம் திருத்து",
    btn_change_pwd: "கடவுச்சொல் மாற்று",
    btn_change_photo: "படத்தை மாற்று",
    label_photo: "சுயவிவரப் படம்",
    label_photo_hint: "JPG, PNG அல்லது SVG வடிவம் (அதிகபட்சம் 2MB)",
    profile_personal_info: "தனிப்பட்ட தகவல்கள்",
    profile_account_details: "கணக்கு விவரங்கள்",
    profile_admin_id: "நிர்வாகி ஐடி",
    profile_last_login: "கடைசி உள்நுழைவு",
    profile_username: "பயனர் பெயர்",
    profile_phone: "தொலைபேசி எண்",
    profile_dob: "பிறந்த தேதி",
    profile_gender: "பாலினம்",
    profile_gender_male: "ஆண்",
    profile_gender_female: "பெண்",
    profile_gender_other: "குறிப்பிட விரும்பவில்லை",
    profile_created: "கணக்கு துவக்கம்",
    profile_status: "கணக்கு நிலை",
    profile_status_active: "செயலில் உள்ளது",
    profile_role_badge: "முதன்மை நிர்வாகி",
    label_fullname: "முழு பெயர்",
    label_username: "பயனர் பெயர்",
    label_email: "மின்னஞ்சல் முகவரி",
    label_phone: "தொலைபேசி எண்",
    label_dob: "பிறந்த தேதி",
    label_gender: "பாலினம்",
    gender_male: "ஆண்",
    gender_female: "பெண்",
    gender_other: "குறிப்பிட விரும்பவில்லை",
    label_admin_id: "நிர்வாகி ஐடி",
    label_account_created: "கணக்கு துவக்கம்",
    label_last_login: "கடைசி உள்நுழைவு",
    readonly_tag: "தானியங்கி முறை",
    label_role: "பொறுப்பு",
    label_bio: "விவரக்குறிப்பு",
    label_current_pwd: "தற்போதைய கடவுச்சொல்",
    label_new_pwd: "புதிய கடவுச்சொல்",
    label_confirm_pwd: "புதிய கடவுச்சொல்லை உறுதி செய்",
    toast_saved: "வெற்றிகரமாக சேமிக்கப்பட்டது!",
    toast_pwd_changed: "கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது!",
    toast_logged_out: "வெற்றிகரமாக வெளியேறியது.",
    msg_phone_invalid: "தொலைபேசி எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும் (எ.கா: 9876543210)",
    msg_profile_saved: "சுயவிவர மாற்றங்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!",

    // AI Chat UI Elements
    chat_status_online: "தமிழி AI பொறிமுறை இயங்குகிறது",
    chat_btn_send: "அனுப்பு",
    chat_btn_clear: "அழி",
    chat_btn_copy: "நகலெடு",
    chat_placeholder: "உங்கள் கேள்வியை அல்லது கோரிக்கையை இங்கே தட்டச்சு செய்க...",
    chat_thinking: "தமிழி AI பதிலளிக்கிறது...",
    chat_welcome: "வணக்கம்! நான் உங்கள் தமிழி AI உதவியாளர். தொழில்நுட்பம், நிரலாக்கம், அறிவியல் அல்லது உங்கள் திட்டப்பணிகள் தொடர்பான எந்தக் கேள்வியையும் என்னிடம் கேட்கலாம்.",
    chat_error: "பதில் பெறுவதில் பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
    chat_empty_err: "தயவுசெய்து ஒரு கேள்வியைத் தட்டச்சு செய்க.",
    chat_user_label: "நீங்கள்",
    chat_ai_label: "தமிழி AI",
    chat_suggest_1: "Python நிரலாக்க மொழி என்றால் என்ன?",
    chat_suggest_2: "செயற்கை நுண்ணறிவின் எதிர்காலம் பற்றி விளக்கு",
    chat_suggest_3: "நவீன REST API உருவாக்குவது எப்படி?",

    // Free Limits & Credits Page
    page_limits_title: "இலவச வரம்புகள் & கிரெடிட்கள்",
    page_limits_subtitle: "பயனர்களுக்கான இலவச பயன்பாட்டு வரம்புகள் மற்றும் கிரெடிட்களை நிர்வகிக்கவும்.",
    page_limits_hero_badge: "வரம்பு & கிரெடிட் மேலாண்மை",

    // Summary Cards
    summary_total_free_credits: "மொத்த இலவச கிரெடிட்கள்",
    summary_credits_used_today: "இன்று பயன்படுத்தப்பட்ட கிரெடிட்கள்",
    summary_credits_remaining: "மீதமுள்ள கிரெடிட்கள்",
    summary_users_free_credits: "இலவச கிரெடிட் பயன்படுத்தும் பயனர்கள்",
    summary_desc_total: "பயனருக்கான தினசரி ஒதுக்கீடு",
    summary_desc_used: "இன்றைய மொத்த ஒதுக்கீட்டில் 34%",
    summary_desc_remaining: "அனைத்து பயனர்களுக்கும் உள்ளது",
    summary_desc_users: "+12 புதிய பயனர்கள் இன்று",

    // Free Limit Cards
    section_free_limits_title: "கருவிகள் வாரியான இலவச வரம்புகள்",
    section_free_limits_desc: "ஒவ்வொரு AI கருவிக்குமான தினசரி இலவச பயன்பாட்டு வரம்புகள் மற்றும் தற்போதைய நிலை",
    card_free_limit: "இலவச வரம்பு",
    card_credits_used: "பயன்படுத்தப்பட்ட கிரெடிட்கள்",
    card_remaining_credits: "மீதமுள்ள கிரெடிட்கள்",
    card_status: "நிலை",
    status_available: "கிடைக்கக்கூடியது",
    status_disabled: "முடக்கப்பட்டது",
    btn_manage_limit: "வரம்பை நிர்வகி",

    // Units & Tool Specific Limits
    limit_unit_messages_day: "20 செய்திகள்/நாள்",
    limit_unit_images_day: "5 படங்கள்/நாள்",
    limit_unit_videos_day: "2 காணொளிகள்/நாள்",
    limit_unit_minutes_day: "10 நிமிடங்கள்/நாள்",
    limit_unit_requests_day: "10 கோரிக்கைகள்/நாள்",
    limit_unit_content_day: "15 கோரிக்கைகள்/நாள்",

    // Tool Titles (Tamil)
    tool_chat_title: "AI உரையாடல்",
    tool_image_title: "பட உருவாக்கம்",
    tool_video_title: "காணொளி உருவாக்கம்",
    tool_audio_title: "ஒலி உருவாக்கம்",
    tool_code_title: "AI நிரலாக்கக் கருவிகள்",
    tool_content_title: "உள்ளடக்க உருவாக்கம்",

    // Manage Limit Modal
    modal_manage_limit_title: "இலவச வரம்பை மாற்று",
    modal_manage_limit_subtitle: "தேர்ந்தெடுக்கப்பட்ட AI கருவிக்கான பயன்பாட்டு ஒதுக்கீட்டை மாற்றியமைக்கவும்",
    label_tool_name: "AI கருவி பெயர்",
    label_daily_limit: "தினசரி இலவச வரம்பு",
    label_monthly_limit: "மாதாந்திர இலவச வரம்பு",
    label_credit_cost: "கிரெடிட் கட்டணம் (ஒரு பயன்பாட்டிற்கு)",
    label_enable_free_limit: "இலவச வரம்பை இயக்கு",
    hint_enable_limit: "இயக்கப்பட்டால், பயனர்கள் தினசரி இலவச ஒதுக்கீட்டை அணுகலாம்",
    btn_save_changes: "மாற்றங்களைச் சேமி",
    btn_cancel: "ரத்துசெய்",

    // Credit Settings Section
    section_credit_settings_title: "கிரெடிட் அமைப்புகள்",
    section_credit_settings_desc: "இலவச பயனர் கிரெடிட்டுகளுக்கான உலகளாவிய ஒதுக்கீடு மற்றும் புதுப்பித்தல் கொள்கைகள்",
    label_daily_free_credits: "தினசரி இலவச கிரெடிட்கள்",
    label_monthly_free_credits: "மாதாந்திர இலவச கிரெடிட்கள்",
    label_enable_free_credits_toggle: "இலவச கிரெடிட்களை இயக்கு",
    desc_enable_free_credits: "அனைத்து பதிவுசெய்த பயனர்களுக்கும் தினசரி இலவச கிரெடிட்டுகளை வழங்கவும்",
    label_rollover_toggle: "கிரெடிட் ரோல்ஓவர் அனுமதி",
    desc_rollover: "பயன்படுத்தப்படாத இலவச கிரெடிட்களை அடுத்த நாளுக்கு எடுத்துச் செல்ல அனுமதிக்கவும்",
    btn_reset_credits: "கிரெடிட்களை மீட்டமை",
    btn_save_settings: "அமைப்புகளைச் சேமி",
    toast_limit_updated: "இலவச வரம்பு வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
    toast_settings_saved: "கிரெடிட் அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!",
    toast_credits_reset: "இன்றைய கிரெடிட் பயன்பாடு மீட்டமைக்கப்பட்டது!",

    // Recent Activity Section
    section_recent_activity_title: "சமீபத்திய கிரெடிட் செயல்பாடுகள்",
    section_recent_activity_desc: "தளத்தின் கருவிகளில் பயனர்களின் நிகழ்நேர இலவச கிரெடிட் பயன்பாட்டு பதிவு",
    th_user: "பயனர்",
    th_tool: "கருவி",
    th_credits_used: "பயன்படுத்திய கிரெடிட்",
    th_date: "தேதி & நேரம்",
    th_status: "நிலை",
    status_completed: "நிறைவுற்றது",
    status_deducted: "கழிக்கப்பட்டது",
    status_active: "செயலில் உள்ளது",

    // Tool Tabs & Headers
    tab_ai_chat: "AI உரையாடல்",
    tab_ai_video: "வீடியோ கருவிகள்",
    tab_ai_image: "பட உருவாக்கம்",
    tab_ai_code: "நிரலாக்கக் கருவிகள்",
    tab_ai_audio: "ஒலிக் கருவிகள்",
    tab_ai_content: "உள்ளடக்கக் கருவிகள்",

    // Video Tools
    video_mode_text: "உரையிலிருந்து வீடியோ",
    video_mode_image: "படத்திலிருந்து வீடியோ",
    video_prompt_label: "வீடியோ உருவாக்கக் கோரிக்கை (Prompt)",
    video_prompt_placeholder: "எ.கா: இரவில் மின்னும் எதிர்காலத் தமிழ் AI நகரம்...",
    video_style_label: "காட்சி பாணி (Style)",
    video_duration_label: "கால அளவு",
    video_ratio_label: "திரை விகிதம்",
    video_drop_hint: "படத்தைப் பதிவேற்ற கிளிக் செய்க அல்லது இழுத்து விடுக",
    btn_generate_video: "வீடியோவை உருவாக்கு",
    video_status_rendering: "வீடியோ உருவாக்கப்படுகிறது... தயவுசெய்து காத்திருக்கவும்.",
    video_result_title: "உருவாக்கப்பட்ட AI வீடியோ",
    btn_download_video: "வீடியோ பதிவிறக்கம் (MP4)",

    // Image Tools
    image_mode_text: "உரையிலிருந்து படம்",
    image_mode_edit: "படத் திருத்தம் & பின்னணி நீக்கம்",
    image_prompt_label: "படக் கோரிக்கை (Prompt)",
    image_prompt_placeholder: "எ.கா: சென்னையில் நிற்கும் எதிர்காலத் தமிழ் AI ரோபோ...",
    image_edit_instruction: "திருத்தக் கட்டளை (Instruction)",
    image_edit_placeholder: "எ.கா: பின்னணியை நீக்கு, நீல நிற பின்னணி அமை, சினிமா பாணி ஒளி சேர்...",
    image_drop_hint: "திருத்த வேண்டிய படத்தைப் பதிவேற்ற கிளிக் செய்க அல்லது இழுத்து விடுக",
    image_style_label: "கலை பாணி (Style)",
    btn_generate_image: "படத்தை உருவாக்கு",
    btn_edit_image: "படத்தைத் திருத்து",
    image_result_title: "உருவாக்கப்பட்ட AI படம்",
    btn_download_image: "படத்தைப் பதிவிறக்கு",

    // Code Tools
    code_prompt_label: "மென்பொருள் திட்டத் தேவை (Requirement)",
    code_prompt_placeholder: "எ.கா: Login, Registration, Products, Cart மற்றும் Payment வசதிகளுடன் முழுமையான E-commerce வலைத்தளம் உருவாக்கு...",
    code_mode_label: "கட்டமைப்பு வகை",
    code_mode_fullstack: "முழுமையான தளம் (Full-Stack)",
    code_mode_frontend: "முன்முனை மட்டும் (Frontend)",
    code_mode_backend: "பின்முனை API (Backend)",
    code_mode_database: "தரவுத்தள மாதிரி (DB Schema)",
    code_mode_debug: "பிழை திருத்தம் & விளக்கம்",
    btn_generate_code: "குறியீட்டை உருவாக்கு",
    code_status_generating: "மென்பொருள் கட்டமைப்பு மற்றும் கோப்புகள் உருவாக்கப்படுகின்றன...",
    code_files_title: "திட்டக் கோப்புகள் & குறியீடுகள்",
    btn_copy_code: "குறியீட்டை நகலெடு",
    btn_download_project: "திட்டத்தை பதிவிறக்கு (ZIP)",

    // Audio Tools
    audio_ideas_title: "பரிந்துரைக்கப்பட்ட குரல் / ஒலி யோசனைகள்:",
    audio_idea_1: "🎯 ஊக்கமளிக்கும் தமிழ் AI அறிமுகக் குரல்",
    audio_idea_2: "🤖 Machine Learning பற்றிய தமிழ் கல்வி விளக்கம்",
    audio_idea_3: "🎙️ தொழில்முறை பாட்காஸ்ட் அறிமுகம்",
    audio_idea_4: "📢 சினிமா பாணி AI குரல் அறிவிப்பு",
    audio_idea_5: "🎵 தொழில்நுட்ப காணொளிக்கான பின்னணி இசை",
    audio_tts_label: "குரலாக மாற்ற வேண்டிய உரை (Text to Speech)",
    audio_tts_placeholder: "இங்கே நீங்கள் குரலாக மாற்ற விரும்பும் உரையை உள்ளிடவும்...",
    audio_voice_label: "குரல் தேர்வு",
    audio_voice_ta_f: "தமிழ் — பெண் குரல்",
    audio_voice_ta_m: "தமிழ் — ஆண் குரல்",
    audio_voice_en_f: "English — Female Voice",
    audio_voice_en_m: "English — Male Voice",
    btn_generate_audio: "குரலை உருவாக்கு",
    audio_status_generating: "இயற்கையான AI குரல் உருவாக்கப்படுகிறது...",
    audio_result_title: "AI ஆடியோ பிளேயர்",
    btn_download_audio: "ஆடியோ பதிவிறக்கம் (MP3)",

    // Content Tools
    content_ideas_title: "பரிந்துரைக்கப்பட்ட உள்ளடக்க வடிவங்கள்:",
    content_idea_1: "📝 தொழில்நுட்ப வலைப்பதிவு கட்டுரை",
    content_idea_2: "📱 சமூக ஊடகப் பதிவு",
    content_idea_3: "🎬 YouTube காணொளி திரைக்கதை",
    content_idea_4: "🛍️ தயாரிப்பு விளக்கம் & விளம்பரம்",
    content_idea_5: "📧 தொழில்முறை வணிக மின்னஞ்சல்",
    content_idea_6: "🔍 SEO உகந்த கட்டுரை",
    content_prompt_label: "உள்ளடக்கத் தலைப்பு / குறிப்புகள்",
    content_prompt_placeholder: "எ.கா: தொடக்கநிலையாளர்களுக்கான செயற்கை நுண்ணறிவு முழு வழிகாட்டி...",
    content_category_label: "பிரிவு",
    content_tone_label: "எழுத்து நடை / தொனி",
    content_tone_prof: "தொழில்முறை (Professional)",
    content_tone_friendly: "நட்பான (Friendly)",
    content_tone_persuasive: "ஈர்க்கக்கூடிய (Persuasive)",
    content_tone_academic: "கல்விமுறை (Academic)",
    content_tone_creative: "படைப்பாற்றல் (Creative)",
    btn_generate_content: "உள்ளடக்கத்தை உருவாக்கு",
    btn_action_rewrite: "மீண்டும் எழுது",
    btn_action_summarize: "சுருக்குக",
    btn_action_translate: "மொழிபெயர்",
    btn_action_expand: "விரிவாக்குக",
    btn_action_shorten: "குறுக்குக",
    content_status_generating: "உயர்தர உள்ளடக்கம் உருவாக்கப்படுகிறது...",
    content_result_title: "உருவாக்கப்பட்ட உள்ளடக்கம்",
    btn_copy_content: "உள்ளடக்கத்தை நகலெடு",
    btn_export_txt: "TXT கோப்பாக பதிவிறக்கு",

    // Common AI Tool Actions & Prompts
    btn_download: "பதிவிறக்கு",
    btn_copy: "நகலெடு",
    video_empty_hint: "கோரிக்கையை உள்ளிட்டு \"வீடியோவை உருவாக்கு\" என்பதை அழுத்தவும்.",
    img_mode_gen: "புதிய படம் உருவாக்கம்",
    img_mode_edit: "படத்தை திருத்துதல் (AI Edit)",
    img_upload_hint: "திருத்த வேண்டிய படத்தைப் பதிவேற்றவும்",
    img_prompt_label: "பட உருவாக்கக் கோரிக்கை (Prompt)",
    img_prompt_placeholder: "எ.கா: மதுரை மீனாட்சி அம்மன் கோவில் தங்கக் கோபுரம் சூரிய அஸ்தமனத்தில்...",
    img_style_label: "கலை பாணி",
    img_ratio_label: "திரை விகிதம்",
    img_status_rendering: "படம் உருவாக்கப்படுகிறது... தயவுசெய்து காத்திருக்கவும்.",
    img_result_title: "உருவாக்கப்பட்ட AI படம்",
    img_empty_hint: "கோரிக்கையை உள்ளிட்டு \"படத்தை உருவாக்கு\" என்பதை அழுத்தவும்.",
    code_mode_full: "Full-Stack திட்டம்",
    code_empty_hint: "மென்பொருள் தேவையை உள்ளிட்டு \"முழு நிரலை உருவாக்கு\" என்பதை அழுத்தவும்.",
    audio_engine_online: "TTS குரல் பொறிமுறை தயார்",
    audio_text_label: "குரலாக மாற்ற வேண்டிய தமிழ் அல்லது ஆங்கில உரை:",
    audio_text_placeholder: "எ.கா: தமிழி AI தளம் தமிழ் பேசும் உலகிற்கு ஒரு புதிய புரட்சியை கொண்டு வருகிறது...",
    audio_speed_label: "வேகம் (Speed)",
    audio_status_synthesizing: "குரல் உருவாக்கப்படுகிறது...",
    audio_player_title: "AI குரல் வாசிப்பான்",
    audio_empty_hint: "உரையை உள்ளிட்டு \"குரலை உருவாக்கு\" என்பதை அழுத்தவும்.",
    content_action_label: "செயல் தேர்வு:",
    content_editor_title: "உள்ளடக்கப் பகுதி (Live Editor)",
    content_result_placeholder: "உருவாக்கப்பட்ட உள்ளடக்கம் இங்கே தோன்றும். நீங்கள் நேரடியாக திருத்தலாம்...",

    // Sub-pages Headers & Generic
    page_users_title: "பயனர் மேலாண்மை",
    page_users_subtitle: "பதிவு செய்த பயனர்களின் பட்டியல் மற்றும் அனுமதிகள்",
    page_ai_title: "AI கருவிகள் மையம்",
    page_ai_subtitle: "தமிழ் AI கருவிகளை ஆராய்ந்து பயன்படுத்தவும்",
    page_settings_title: "கணினி அமைப்புகள்",
    page_settings_subtitle: "நிர்வாக மற்றும் பாதுகாப்பு கட்டமைப்பு",
    page_lang_title: "மொழி அமைப்புகள்",
    page_lang_subtitle: "தமிழ் உள்ளூர்மயமாக்கல் மற்றும் அகராதி மேலாண்மை",
    page_reports_title: "தகவல் அறிக்கைகள் & புள்ளிவிவரங்கள்",
    page_reports_subtitle: "தளத்தின் செயல்திறன் மற்றும் AI பயன்பாட்டு பகுப்பாய்வு",
    page_feedback_title: "பயனர் கருத்துக்கள் & மதிப்பீடுகள்",
    page_feedback_subtitle: "பயனர்களிடமிருந்து பெறப்பட்ட கருத்துக்கள் மற்றும் ஆதரவு",

    btn_back_home: "முகப்புக்கு திரும்பு",
    status_active: "செயலில் உள்ளது",
    status_inactive: "செயலற்றது",
    action_view: "பார்வை",
    action_edit: "திருத்து",
    action_delete: "நீக்கு",
    action_send: "அனுப்பு",
    placeholder_search_user: "பயனர் பெயர் அல்லது மின்னஞ்சலைத் தேடுக...",

    // Table Headers
    th_user: "பயனர்",
    th_role: "பொறுப்பு",
    th_joined_date: "சேர்ந்த தேதி",
    th_status: "நிலை",
    th_actions: "செயல்கள்",
    th_tool_name: "AI கருவியின் பெயர்",
    th_usage_count: "பயன்பாடு எண்ணிக்கை",
    th_share: "பங்கு சதவீதம்",
    th_performance: "செயல்திறன்",

    // User Roles & Names
    role_super_admin: "முதன்மை பயனர்",
    role_developer: "மென்பொருள் உருவாக்குநர்",
    role_general: "பொதுப் பயனர்",
    role_writer: "உள்ளடக்க எழுத்தாளர்",
    role_admin: "நிர்வாகி",
    user_1_name: "சரவணன் முத்துக்குமார்",
    user_2_name: "பிரியா சுந்தர்ராஜ்",
    user_3_name: "கார்த்திக் பாலமுருகன்",
    user_4_name: "அனிதா இராமலிங்கம்",

    // Dedicated AI Usage Page Translations
    page_ai_usage_title: "AI பயன்பாடு & செயல்பாடுகள்",
    page_ai_usage_subtitle: "தளத்தின் AI பயன்பாட்டு பகுப்பாய்வு மற்றும் நிகழ்நேர புள்ளிவிவரங்கள்",
    stat_total_requests: "மொத்த AI கோரிக்கைகள்",
    stat_total_requests_val: "1,48,920",
    stat_total_requests_trend: "+ 24%",
    stat_active_ai_users: "செயலில் உள்ள பயனர்கள்",
    stat_active_ai_users_val: "842",
    stat_active_ai_users_trend: "+ 15%",
    stat_most_used_tool: "அதிகம் பயன்படுத்தப்பட்ட AI கருவி",
    stat_most_used_tool_val: "AI உரையாடல்",
    stat_today_usage: "இன்றைய AI பயன்பாடு",
    stat_today_usage_val: "14,250",
    stat_today_usage_trend: "+ 8%",
    stat_weekly_usage: "வாராந்திர AI பயன்பாடு",
    stat_weekly_usage_val: "98,400",
    stat_weekly_usage_trend: "+ 19%",
    ai_usage_chart_title: "AI பயன்பாடு — கடந்த 7 நாட்கள்",
    ai_tool_breakdown_title: "AI கருவிகள் பயன்பாட்டு புள்ளிவிவரங்கள்",
    ai_recent_activity_title: "சமீபத்திய AI செயல்பாடுகள்",

    // AI Tools Names
    tool_chat: "AI உரையாடல்",
    tool_video: "வீடியோ கருவிகள்",
    tool_image: "பட உருவாக்கம்",
    tool_audio: "ஆடியோ கருவிகள்",
    tool_code: "கோடு கருவிகள்",

    // Recent AI Activities
    act_ai_chat_user: "பயனர் AI உரையாடலைப் பயன்படுத்தினார்",
    act_ai_image_user: "பயனர் ஒரு புதிய படத்தை உருவாக்கினார்",
    act_ai_video_user: "பயனர் வீடியோ கருவியைப் பயன்படுத்தினார்",
    act_ai_audio_user: "பயனர் ஆடியோ கருவியைப் பயன்படுத்தினார்",
    act_ai_code_user: "பயனர் கோடு கருவியைப் பயன்படுத்தினார்",
    time_just_now: "சற்று முன்",
    time_2m_ago: "2 நிமிடங்களுக்கு முன்",
    time_5m_ago: "5 நிமிடங்களுக்கு முன்",
    time_12m_ago: "12 நிமிடங்களுக்கு முன்",
    time_25m_ago: "25 நிமிடங்களுக்கு முன்",

    // Settings Page specific
    label_site_name: "தளத்தின் பெயர்",
    site_name_val: "தமிழி AI மையம்",
    label_admin_email: "நிர்வாக மின்னஞ்சல்",
    label_2fa_title: "இரண்டு அடுக்கு பாதுகாப்பு (2FA)",
    label_2fa_desc: "நிர்வாக கணக்கிற்கு கூடுதல் பாதுகாப்பு",
    label_backup_title: "தானியங்கி காப்புப்பிரதி",
    label_backup_desc: "தினசரி தரவுத்தள காப்பு",
    label_api_key_title: "இணைப்பு விசை",
    btn_copy_key: "📋 நகலெடு",

    // Language Page specific
    th_en_word: "ஆங்கில சொல்",
    th_ta_word: "தமிழ் சொல்",
    th_category_usage: "பயன்பாட்டு பிரிவு",
    gloss_cat_nav: "வழிசெலுத்தல்",
    gloss_cat_acc: "கணக்குகள்",
    gloss_cat_core: "மைய பொறிமுறை",
    gloss_cat_ai: "AI கருவிகள்",
    gloss_cat_sys: "கணினி",
    label_font_primary: "முதன்மை தமிழ் எழுத்துரு",
    btn_font_save: "சேமி",

    // Reports Page specific
    stat_response_time: "AI பதிலளிப்பு நேரம்",
    stat_response_val: "⚡ விரைவானது",
    stat_success_rate: "வெற்றி விகிதம்",
    stat_tamil_processing: "தமிழ் உரை செயலாக்கம்",
    stat_tamil_processing_val: "4.8M / நாள்",

    // Feedback Page specific
    fb_1_user: "ராஜேஷ் கண்ணன்",
    fb_1_text: "\"தமிழி AI உரையாடல் மூலம் தமிழில் தொழில்முறை கடிதங்களை மிக எளிதாக எழுத முடிகிறது. அற்புத தொழில்நுட்பம்!\"",
    fb_2_user: "சுவாதி நாராயணன்",
    fb_2_text: "\"பட உருவாக்க அம்சம் தமிழ்க் கலாச்சாரக் கருத்துக்களை துல்லியமாக காட்சிப்படுத்துகிறது. வாழ்த்துக்கள்!\"",

    // Legacy Content fallbacks
    nav_content: "உள்ளடக்கம்",
    page_content_title: "உள்ளடக்க மேலாண்மை",
    page_content_subtitle: "இணையதள கட்டுரைகள் மற்றும் மீடியா கோப்புகளை நிர்வகிக்கவும்",
    btn_new_doc: "புதிய கட்டுரை",
    sub_content_articles: "கட்டுரைகள்",
    sub_content_media: "மீடியா கோப்புகள்",
    th_title: "தலைப்பு",
    th_category: "வகை",
    th_date: "தேதி",
    th_action: "செயல்",
    art_1_title: "தமிழில் AI தொழில்நுட்பம்",
    art_1_cat: "செயற்கை நுண்ணறிவு",
    art_1_status: "வெளியிடப்பட்டது",
    art_2_title: "இயற்கை மொழி செயலாக்கம்",
    art_2_cat: "ஆராய்ச்சி",
    art_2_status: "வரைவு",
    art_3_title: "நிரலாக்கக் குறிப்புகள்",
    art_3_cat: "தொழில்நுட்பம்",
    art_3_status: "வெளியிடப்பட்டது"
  },

  en: {
    // Brand & Sidebar
    brand_name: "THAMILI",
    brand_sub: "AI HUB",
    sidebar_quote: "\"The Best AI World in Tamil...\"",
    admin_title: "Super Administrator",
    admin_name: "Admin",

    // Sidebar Navigation
    nav_home: "Home",
    nav_users: "User Management",
    nav_ai_tools: "AI Tools",
    nav_ai_usage: "AI Usage",
    nav_settings: "Settings",
    nav_language: "Language Settings",
    nav_reports: "Analytics & Reports",
    nav_feedback: "User Feedback",

    // Sidebar Submenus
    sub_home_overview: "Dashboard Overview",
    sub_home_analytics: "Usage Analytics",
    sub_home_quick: "Quick Links",

    sub_users_list: "User List",
    sub_users_add: "Add New User",
    sub_users_roles: "Roles & Permissions",
    sub_users_blocked: "Blocked Users",

    sub_ai_chat: "AI Agent",
    sub_ai_image: "Image Generation",
    sub_ai_video: "Video Tools",
    sub_ai_code: "General Search",
    sub_ai_audio: "Audio Tools",
    sub_ai_content: "Research",

    sub_ai_usage_stats: "Usage Statistics",
    sub_ai_usage_tools: "Tool Breakdown",
    sub_ai_usage_activity: "Recent Activity",

    sub_settings_general: "General Settings",
    sub_settings_security: "Security Settings",
    sub_settings_api: "API Keys",
    sub_settings_notifications: "Notifications",

    sub_lang_tamil: "Tamil Configuration",
    sub_lang_fonts: "Typography & Fonts",
    sub_lang_dict: "Translation Glossary",

    sub_reports_users: "User Statistics",
    sub_reports_ai: "AI Usage Analytics",
    sub_reports_perf: "Performance Metrics",
    sub_reports_export: "Export Data",

    sub_feedback_recent: "Recent Feedback",
    sub_feedback_ratings: "Ratings & Reviews",
    sub_feedback_support: "Support Tickets",

    // Header Elements
    search_placeholder: "Search anything...",
    lang_ta: "தமிழ்",
    lang_en: "English",
    date_format_locale: "en-US",
    profile_menu_profile: "Profile",
    profile_menu_edit: "Edit Profile",
    profile_menu_password: "Change Password",
    profile_menu_logout: "Logout",

    // Hero Banner
    hero_badge: "Admin Operation Panel",
    hero_title: "THAMILI AI Hub",
    hero_desc: "Global cutting-edge technology in Tamil language, at your fingertips...",
    hero_slogan: "Your Language, Our Technology",
    hero_btn: "Go to AI Tools",

    // Quick Access Section
    quick_access_title: "Configure",
    quick_access_sublink: "Directly use AI Tools",

    // 6 Quick Access Cards
    card_chat_title: "AI Chat",
    card_chat_desc: "Instant and accurate intelligent answers powered by advanced AI",
    card_chat_user_desc: "Chat with AI in Tamil or English",

    card_video_title: "Video Tools",
    card_video_desc: "Generate, edit and transform videos effortlessly",
    card_video_user_desc: "Generate and edit videos using AI",

    card_image_title: "Image Tools",
    card_image_desc: "Transform your creative imagination into stunning visual art",
    card_image_user_desc: "Generate and edit images using AI",

    card_code_title: "General Search",
    card_code_desc: "Smart assistance to write, debug, and execute code",
    card_code_user_desc: "Generate frontend, backend and full-stack code",

    card_audio_title: "Audio Tools",
    card_audio_desc: "Voice morphing, speech synthesis, and transcription",
    card_audio_user_desc: "Create AI-powered speech and audio",

    card_content_title: "Research",
    card_content_desc: "Documents, article authoring, summarization & translation",
    card_content_user_desc: "Create articles, scripts, social media content and more",

    btn_back_to_tools: "All AI Tools",
    btn_all_tools: "All AI Tools",
    quick_overview_title: "THAMILI AI Platform Highlights",
    side_ai_status_title: "AI Engine Status",

    // Platform Usage Chart
    chart_title: "Platform Usage",
    chart_subtitle_suffix: "(Last 7 Days)",
    chart_filter_7d: "7 Days",
    chart_filter_30d: "30 Days",
    chart_filter_90d: "3 Months",
    chart_tooltip_users: "Users",
    chart_days: ["13 Sep", "14 Sep", "15 Sep", "16 Sep", "17 Sep", "18 Sep", "19 Sep"],

    // Key Statistics (Right Column Top)
    stats_title: "Key Statistics",
    stat_registered_users: "Registered Users",
    stat_registered_count: "1,248",
    stat_registered_trend: "+ 12%",

    stat_site_visitors: "Site Visitors",
    stat_visitors_count: "8,932",
    stat_visitors_trend: "+ 18%",

    stat_active_users: "Active Online Users",
    stat_active_count: "236",
    stat_active_trend: "+ 6%",

    // Recent Activities (Right Column Middle)
    activity_title: "Recent Activities",
    activity_view_all: "View All",
    act_1_title: "New user registered",
    act_1_desc: "saravanan123@example.com",
    act_1_time: "09:42 AM",

    act_2_title: "AI Tool executed",
    act_2_desc: "Tamil Text Generation",
    act_2_time: "08:58 AM",

    act_3_title: "New content added",
    act_3_desc: "Video Tools",
    act_3_time: "08:21 AM",

    act_4_title: "Site visited",
    act_4_desc: "User Dashboard - Tamil",
    act_4_time: "07:45 AM",

    act_5_title: "Settings updated",
    act_5_desc: "Language Settings - Tamil",
    act_5_time: "07:30 AM",

    // Bottom Badges
    badge_security_title: "Secure Platform",
    badge_security_desc: "Your data is our utmost responsibility",

    badge_speed_title: "High Performance",
    badge_speed_desc: "Powered by modern architecture",

    badge_purpose_title: "Dedicated for Tamil",
    badge_purpose_desc: "Global accessibility & reach",

    // Promo Card (Right Column Bottom)
    promo_title: "Tamil Speaking AI World...",
    promo_desc: "Together let's build an inspiring technological future!",
    promo_btn: "Explore AI Tools",

    // Modals & Notifications
    modal_profile_title: "Administrator Profile",
    modal_edit_profile_title: "Edit Admin Profile",
    modal_change_pwd_title: "Change Password",
    modal_logout_title: "Confirm Logout",
    modal_logout_desc: "Are you sure you want to sign out of the Admin panel?",
    btn_save: "Save Changes",
    btn_cancel: "Cancel",
    btn_close: "Close",
    btn_confirm: "Confirm",
    btn_logout: "Logout",
    btn_edit_profile: "Edit Profile",
    btn_change_pwd: "Change Password",
    btn_change_photo: "Change Photo",
    label_photo: "Profile Photo",
    label_photo_hint: "JPG, PNG or SVG format (Max 2MB)",
    profile_personal_info: "Personal Information",
    profile_account_details: "Account Details",
    profile_admin_id: "Admin ID",
    profile_last_login: "Last Login",
    profile_username: "Username",
    profile_phone: "Phone Number",
    profile_dob: "Date of Birth",
    profile_gender: "Gender",
    profile_gender_male: "Male",
    profile_gender_female: "Female",
    profile_gender_other: "Prefer not to say",
    profile_created: "Account Created",
    profile_status: "Account Status",
    profile_status_active: "Active",
    profile_role_badge: "Administrator",
    label_fullname: "Full Name",
    label_username: "Username",
    label_email: "Email Address",
    label_phone: "Phone Number",
    label_dob: "Date of Birth",
    label_gender: "Gender",
    gender_male: "Male",
    gender_female: "Female",
    gender_other: "Prefer not to say",
    label_admin_id: "Admin ID",
    label_account_created: "Account Created",
    label_last_login: "Last Login",
    readonly_tag: "System Managed",
    label_role: "Role",
    label_bio: "Biography",
    label_current_pwd: "Current Password",
    label_new_pwd: "New Password",
    label_confirm_pwd: "Confirm New Password",
    toast_saved: "Saved successfully!",
    toast_pwd_changed: "Password changed successfully!",
    toast_logged_out: "Logged out successfully.",
    msg_phone_invalid: "Phone number must be exactly 10 digits (e.g. 9876543210)",
    msg_profile_saved: "Profile changes saved successfully!",

    // AI Chat UI Elements
    chat_status_online: "THAMILI Core AI Engine Online",
    chat_btn_send: "Send",
    chat_btn_clear: "Clear",
    chat_btn_copy: "Copy",
    chat_placeholder: "Type your question or request here...",
    chat_thinking: "THAMILI AI is thinking...",
    chat_welcome: "Hello! I am your THAMILI AI assistant. Feel free to ask any question regarding programming, technology, science, or your projects.",
    chat_error: "An error occurred while generating response. Please try again.",
    chat_empty_err: "Please type a message before sending.",
    chat_user_label: "You",
    chat_ai_label: "THAMILI AI",
    chat_suggest_1: "What is Python programming language?",
    chat_suggest_2: "Explain the future of Artificial Intelligence",
    chat_suggest_3: "How to build a modern REST API?",

    // Free Limits & Credits Page
    page_limits_title: "Free Limits & Credits",
    page_limits_subtitle: "Manage free usage limits and credits available to users.",
    page_limits_hero_badge: "Limits & Credit Management",

    // Summary Cards
    summary_total_free_credits: "Total Free Credits",
    summary_credits_used_today: "Credits Used Today",
    summary_credits_remaining: "Credits Remaining",
    summary_users_free_credits: "Users Using Free Credits",
    summary_desc_total: "Standard quota per user",
    summary_desc_used: "34% of total daily allocation",
    summary_desc_remaining: "Available across active users",
    summary_desc_users: "+12 new users today",

    // Free Limit Cards
    section_free_limits_title: "Tool-wise Free Limits",
    section_free_limits_desc: "Daily free usage limits and current allocation status for each AI tool",
    card_free_limit: "Free Limit",
    card_credits_used: "Credits Used",
    card_remaining_credits: "Remaining Credits",
    card_status: "Status",
    status_available: "Available",
    status_disabled: "Disabled",
    btn_manage_limit: "Manage Limit",

    // Units & Tool Specific Limits
    limit_unit_messages_day: "20 messages/day",
    limit_unit_images_day: "5 images/day",
    limit_unit_videos_day: "2 videos/day",
    limit_unit_minutes_day: "10 minutes/day",
    limit_unit_requests_day: "10 requests/day",
    limit_unit_content_day: "15 requests/day",

    // Tool Titles (English)
    tool_chat_title: "AI Agent",
    tool_image_title: "Image Generation",
    tool_video_title: "Video Generation",
    tool_audio_title: "Audio Generation",
    tool_code_title: "General Search",
    tool_content_title: "Research",

    // Manage Limit Modal
    modal_manage_limit_title: "Manage Free Limit",
    modal_manage_limit_subtitle: "Configure usage allocation and credit parameters for the selected tool",
    label_tool_name: "AI Tool Name",
    label_daily_limit: "Daily Free Limit",
    label_monthly_limit: "Monthly Free Limit",
    label_credit_cost: "Credit Cost (per usage)",
    label_enable_free_limit: "Enable Free Limit",
    hint_enable_limit: "When enabled, users can utilize the daily free quota",
    btn_save_changes: "Save Changes",
    btn_cancel: "Cancel",

    // Credit Settings Section
    section_credit_settings_title: "Credit Settings",
    section_credit_settings_desc: "Global allocation and renewal policies for free user credits",
    label_daily_free_credits: "Daily Free Credits",
    label_monthly_free_credits: "Monthly Free Credits",
    label_enable_free_credits_toggle: "Enable Free Credits",
    desc_enable_free_credits: "Provide daily free credits to all registered users",
    label_rollover_toggle: "Allow Credit Rollover",
    desc_rollover: "Allow unused free credits to carry over to the next day",
    btn_reset_credits: "Reset Credits",
    btn_save_settings: "Save Settings",
    toast_limit_updated: "Free limit updated successfully!",
    toast_settings_saved: "Credit settings saved successfully!",
    toast_credits_reset: "Today's credit usage reset successfully!",

    // Recent Activity Section
    section_recent_activity_title: "Recent Credit Activity",
    section_recent_activity_desc: "Real-time log of free credit usage across platform tools",
    th_user: "User",
    th_tool: "Tool",
    th_credits_used: "Credits Used",
    th_date: "Date & Time",
    th_status: "Status",
    status_completed: "Completed",
    status_deducted: "Deducted",
    status_active: "Active",

    // Tool Tabs & Headers
    tab_ai_chat: "AI Chat",
    tab_ai_video: "Video Studio",
    tab_ai_image: "Image Studio",
    tab_ai_code: "Code Studio",
    tab_ai_audio: "Audio & Voice",
    tab_ai_content: "Content Studio",

    // Video Tools
    video_mode_text: "Text to Video",
    video_mode_image: "Image to Video",
    video_prompt_label: "Video Prompt / Concept",
    video_prompt_placeholder: "e.g. Cinematic video of a futuristic Tamil AI city at night...",
    video_style_label: "Visual Style",
    video_duration_label: "Duration",
    video_ratio_label: "Aspect Ratio",
    video_drop_hint: "Click or drag & drop an image to animate",
    btn_generate_video: "Generate Video",
    video_status_rendering: "Generating cinematic video... Please wait.",
    video_result_title: "Generated AI Video Result",
    btn_download_video: "Download Video (MP4)",

    // Image Tools
    image_mode_text: "Text to Image",
    image_mode_edit: "Image Edit & Background",
    image_prompt_label: "Image Prompt",
    image_prompt_placeholder: "e.g. Futuristic Tamil AI robot standing in Chennai...",
    image_edit_instruction: "Edit Instruction",
    image_edit_placeholder: "e.g. Remove background, make background futuristic city, add cinematic lighting...",
    image_drop_hint: "Click or drag & drop an image to edit",
    image_style_label: "Artistic Style",
    btn_generate_image: "Generate Image",
    btn_edit_image: "Apply Image Edit",
    image_result_title: "Generated AI Image Result",
    btn_download_image: "Download Image",

    // Code Tools
    code_prompt_label: "Application Requirement / Prompt",
    code_prompt_placeholder: "e.g. Create a complete e-commerce website with login, registration, product listing, cart and payment pages...",
    code_mode_label: "Architecture Mode",
    code_mode_fullstack: "Full-Stack Application",
    code_mode_frontend: "Frontend Component",
    code_mode_backend: "Backend REST API",
    code_mode_database: "Database Schema / Models",
    code_mode_debug: "Debug & Explain Code",
    btn_generate_code: "Generate Code Solution",
    code_status_generating: "Synthesizing full application architecture and files...",
    code_files_title: "Project Structure & Code Files",
    btn_copy_code: "Copy Code",
    btn_download_project: "Download Project (ZIP)",

    // Audio Tools
    audio_ideas_title: "Suggested Audio & Voice Ideas:",
    audio_idea_1: "🎯 Motivational Tamil AI Voice Introduction",
    audio_idea_2: "🤖 Tamil Educational Explanation on Machine Learning",
    audio_idea_3: "🎙️ Professional Podcast Intro",
    audio_idea_4: "📢 Cinematic AI Voice Announcement",
    audio_idea_5: "🎵 Background Music for Tech Video",
    audio_tts_label: "Text to Convert to Speech (TTS)",
    audio_tts_placeholder: "Enter the text you want converted into natural speech...",
    audio_voice_label: "Voice Character",
    audio_voice_ta_f: "Tamil — Female Voice",
    audio_voice_ta_m: "Tamil — Male Voice",
    audio_voice_en_f: "English — Female Voice",
    audio_voice_en_m: "English — Male Voice",
    btn_generate_audio: "Generate Speech / Audio",
    audio_status_generating: "Synthesizing natural AI voice...",
    audio_result_title: "AI Audio Player",
    btn_download_audio: "Download Audio (MP3)",

    // Content Tools
    content_ideas_title: "Suggested Content Formats:",
    content_idea_1: "📝 Tech Blog Article",
    content_idea_2: "📱 Viral Social Media Post",
    content_idea_3: "🎬 YouTube Video Script",
    content_idea_4: "🛍️ High-Converting Product Copy",
    content_idea_5: "📧 Professional Business Email",
    content_idea_6: "🔍 SEO-Optimized Article",
    content_prompt_label: "Content Topic / Instructions",
    content_prompt_placeholder: "e.g. Complete beginner's guide to Artificial Intelligence...",
    content_category_label: "Category",
    content_tone_label: "Tone of Voice",
    content_tone_prof: "Professional",
    content_tone_friendly: "Friendly & Engaging",
    content_tone_persuasive: "Persuasive / Sales",
    content_tone_academic: "Academic & Formal",
    content_tone_creative: "Creative & Storytelling",
    btn_generate_content: "Generate Content",
    btn_action_rewrite: "Rewrite",
    btn_action_summarize: "Summarize",
    btn_action_translate: "Translate",
    btn_action_expand: "Expand",
    btn_action_shorten: "Shorten",
    content_status_generating: "Generating high-quality content...",
    content_result_title: "Generated Content Editor",
    btn_copy_content: "Copy Content",
    btn_export_txt: "Export as TXT",

    // Common AI Tool Actions & Prompts
    btn_download: "Download",
    btn_copy: "Copy",
    video_empty_hint: "Enter a prompt and click \"Generate Video\".",
    img_mode_gen: "New Image Generation",
    img_mode_edit: "Edit Image (AI Edit)",
    img_upload_hint: "Upload image to edit",
    img_prompt_label: "Image Generation Prompt",
    img_prompt_placeholder: "e.g. A futuristic cybernetic city at sunset...",
    img_style_label: "Art Style",
    img_ratio_label: "Aspect Ratio",
    img_status_rendering: "Generating image... Please wait.",
    img_result_title: "Generated AI Image",
    img_empty_hint: "Enter a prompt and click \"Generate Image\".",
    code_mode_full: "Full-Stack Project",
    code_empty_hint: "Enter software requirements and click \"Generate Code\".",
    audio_engine_online: "TTS Voice Engine Ready",
    audio_text_label: "Text to synthesize into speech:",
    audio_text_placeholder: "e.g. Welcome to Thamili AI platform...",
    audio_speed_label: "Playback Speed",
    audio_status_synthesizing: "Synthesizing voice audio...",
    audio_player_title: "AI Voice Player",
    audio_empty_hint: "Enter text and click \"Generate Voice\".",
    content_action_label: "Content Action:",
    content_editor_title: "Live Content Editor",
    content_result_placeholder: "Generated content will appear here...",

    // Sub-pages Headers & Generic
    page_users_title: "User Management",
    page_users_subtitle: "Manage registered user accounts and permissions",
    page_ai_title: "AI Tools Center",
    page_ai_subtitle: "Explore and deploy Tamil AI capabilities",
    page_settings_title: "System Settings",
    page_settings_subtitle: "Administrative configuration and security parameters",
    page_lang_title: "Language Settings",
    page_lang_subtitle: "Tamil localization and terminology dictionary",
    page_reports_title: "Reports & Analytics",
    page_reports_subtitle: "Platform performance and AI utilization metrics",
    page_feedback_title: "User Feedback & Reviews",
    page_feedback_subtitle: "Insights and support requests from users",

    btn_back_home: "Back to Home",
    status_active: "Active",
    status_inactive: "Inactive",
    action_view: "View",
    action_edit: "Edit",
    action_delete: "Delete",
    action_send: "Send",
    placeholder_search_user: "Search users by name or email...",

    // Table Headers
    th_user: "User",
    th_role: "Role",
    th_joined_date: "Joined Date",
    th_status: "Status",
    th_actions: "Actions",
    th_tool_name: "AI Tool Name",
    th_usage_count: "Usage Count",
    th_share: "Share %",
    th_performance: "Performance",

    // User Roles & Names
    role_super_admin: "Super Admin",
    role_developer: "Software Developer",
    role_general: "General User",
    role_writer: "Content Writer",
    role_admin: "Admin",
    user_1_name: "Saravanan Muthukumar",
    user_2_name: "Priya Sundarraj",
    user_3_name: "Karthik Balamurugan",
    user_4_name: "Anitha Ramalingam",

    // Dedicated AI Usage Page Translations
    page_ai_usage_title: "AI Usage & Activity",
    page_ai_usage_subtitle: "Platform AI utilization analytics and real-time activity",
    stat_total_requests: "Total AI Requests",
    stat_total_requests_val: "148,920",
    stat_total_requests_trend: "+ 24%",
    stat_active_ai_users: "Active AI Users",
    stat_active_ai_users_val: "842",
    stat_active_ai_users_trend: "+ 15%",
    stat_most_used_tool: "Most Used AI Tool",
    stat_most_used_tool_val: "AI Chat",
    stat_today_usage: "Today's AI Usage",
    stat_today_usage_val: "14,250",
    stat_today_usage_trend: "+ 8%",
    stat_weekly_usage: "Weekly AI Usage",
    stat_weekly_usage_val: "98,400",
    stat_weekly_usage_trend: "+ 19%",
    ai_usage_chart_title: "AI Usage — Last 7 Days",
    ai_tool_breakdown_title: "AI Tool Usage Statistics",
    ai_recent_activity_title: "Recent AI Activity",

    // AI Tools Names
    tool_chat: "AI Chat",
    tool_video: "Video Tools",
    tool_image: "Image Generation",
    tool_audio: "Audio Tools",
    tool_code: "Code Tools",

    // Recent AI Activities
    act_ai_chat_user: "User used AI Chat",
    act_ai_image_user: "User generated an image",
    act_ai_video_user: "User used a video tool",
    act_ai_audio_user: "User used an audio tool",
    act_ai_code_user: "User used a code tool",
    time_just_now: "Just now",
    time_2m_ago: "2 mins ago",
    time_5m_ago: "5 mins ago",
    time_12m_ago: "12 mins ago",
    time_25m_ago: "25 mins ago",

    // Settings Page specific
    label_site_name: "Site Name",
    site_name_val: "THAMILI AI Hub",
    label_admin_email: "Admin Email",
    label_2fa_title: "Two-Factor Authentication (2FA)",
    label_2fa_desc: "Enhanced security for administrator accounts",
    label_backup_title: "Automated Database Backup",
    label_backup_desc: "Daily scheduled cloud backup",
    label_api_key_title: "API Key",
    btn_copy_key: "📋 Copy Key",

    // Language Page specific
    th_en_word: "English Term",
    th_ta_word: "Tamil Translation",
    th_category_usage: "Domain Category",
    gloss_cat_nav: "Navigation",
    gloss_cat_acc: "Accounts",
    gloss_cat_core: "Core Engine",
    gloss_cat_ai: "AI Tools",
    gloss_cat_sys: "System",
    label_font_primary: "Primary Tamil Font",
    btn_font_save: "Save Font",

    // Reports Page specific
    stat_response_time: "AI Response Time",
    stat_response_val: "⚡ Ultra Fast",
    stat_success_rate: "Success Rate",
    stat_tamil_processing: "Tamil Text Processing",
    stat_tamil_processing_val: "4.8M / Day",

    // Feedback Page specific
    fb_1_user: "Rajesh Kannan",
    fb_1_text: "\"Writing professional letters in Tamil is effortless with THAMILI AI Chat. Amazing technology!\"",
    fb_2_user: "Swathi Narayanan",
    fb_2_text: "\"The image generation tool visualizes Tamil cultural themes with incredible precision. Kudos!\"",

    // Legacy Content fallbacks
    nav_content: "Content",
    page_content_title: "Content Management",
    page_content_subtitle: "Manage website articles and media files",
    btn_new_doc: "New Article",
    sub_content_articles: "Articles",
    sub_content_media: "Media Files",
    th_title: "Title",
    th_category: "Category",
    th_date: "Date",
    th_action: "Action",
    art_1_title: "AI Technology in Tamil",
    art_1_cat: "Artificial Intelligence",
    art_1_status: "Published",
    art_2_title: "Natural Language Processing",
    art_2_cat: "Research",
    art_2_status: "Draft",
    art_3_title: "Programming Tips",
    art_3_cat: "Technology",
    art_3_status: "Published"
  }
};

class I18nEngine {
  constructor() {
    this.storageKey = 'thamili_admin_lang';
    this.currentLang = localStorage.getItem(this.storageKey) || 'ta';
  }

  init() {
    this.setLanguage(this.currentLang, false);
    this.bindEvents();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  get(key) {
    const langDict = THAMILI_TRANSLATIONS[this.currentLang] || THAMILI_TRANSLATIONS.ta;
    return langDict[key] || THAMILI_TRANSLATIONS.ta[key] || key;
  }

  setLanguage(lang, persist = true) {
    if (lang !== 'ta' && lang !== 'en') lang = 'ta';
    this.currentLang = lang;
    if (persist) {
      localStorage.setItem(this.storageKey, lang);
    }

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    // Translate all [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.get(key);
      if (text) {
        el.textContent = text;
      }
    });

    // Translate all [data-i18n-html]
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const text = this.get(key);
      if (text) {
        el.innerHTML = text;
      }
    });

    // Translate [data-i18n-placeholder]
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.get(key);
      if (text) {
        el.setAttribute('placeholder', text);
      }
    });

    // Translate [data-i18n-value]
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const key = el.getAttribute('data-i18n-value');
      const text = this.get(key);
      if (text) {
        el.value = text;
      }
    });

    // Translate [data-i18n-title]
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const text = this.get(key);
      if (text) {
        el.setAttribute('title', text);
      }
    });

    // Update active state in language dropdown
    const currentLangLabel = document.getElementById('currentLangLabel');
    if (currentLangLabel) {
      currentLangLabel.textContent = lang === 'ta' ? 'தமிழ்' : 'English';
    }

    // Dynamic Logo Switching based on language
    const logoEn = 'assets/images/thamili-logo-en.png';
    const logoTa = 'assets/images/thamili-logo-ta.png';
    const currentLogo = lang === 'ta' ? logoTa : logoEn;
    const altText = lang === 'ta' ? 'தமிழி' : 'THAMILI';

    document.querySelectorAll('.sidebar-brand-logo, #sidebarBrandLogo').forEach(img => {
      img.src = currentLogo;
      img.alt = altText;
    });

    document.querySelectorAll('.lang-opt').forEach(opt => {
      if (opt.getAttribute('data-lang-val') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Refresh dynamic widgets
    this.updateClock();

    // Trigger custom event for components
    window.dispatchEvent(new CustomEvent('thamili_lang_changed', { detail: { lang } }));
  }

  updateClock() {
    const clockDateEl = document.getElementById('headerDate');
    const clockTimeEl = document.getElementById('headerTime');
    if (!clockDateEl && !clockTimeEl) return;

    const now = new Date();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    if (this.currentLang === 'ta') {
      const ampmTa = hours >= 12 ? 'மாலை' : 'காலை';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeStr = `${ampmTa} ${hours.toString().padStart(2, '0')}:${minutes}`;
      if (clockTimeEl) clockTimeEl.textContent = timeStr;

      const tamilMonths = [
        "ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்",
        "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"
      ];
      const day = now.getDate();
      const month = tamilMonths[now.getMonth()];
      const year = now.getFullYear();
      if (clockDateEl) clockDateEl.textContent = `${day} ${month} ${year}`;
    } else {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeStr = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
      if (clockTimeEl) clockTimeEl.textContent = timeStr;

      const enMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const day = now.getDate();
      const month = enMonths[now.getMonth()];
      const year = now.getFullYear();
      if (clockDateEl) clockDateEl.textContent = `${day} ${month} ${year}`;
    }
  }

  bindEvents() {
    const langBtn = document.getElementById('langDropdownBtn');
    const langMenu = document.getElementById('langDropdownMenu');

    if (langBtn && langMenu) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = langMenu.classList.contains('hidden');
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
        if (isHidden) {
          langMenu.classList.remove('hidden');
        }
      });
    }

    document.querySelectorAll('.lang-opt').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = opt.getAttribute('data-lang-val');
        this.setLanguage(selectedLang);
        if (langMenu) langMenu.classList.add('hidden');
      });
    });

    document.addEventListener('click', () => {
      if (langMenu) langMenu.classList.add('hidden');
    });
  }
}

// Global instance
window.i18n = new I18nEngine();
document.addEventListener('DOMContentLoaded', () => {
  window.i18n.init();
});
