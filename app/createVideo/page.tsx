'use client'

import React, { useState } from 'react'
import { main } from '../styles.css'
import { MainTitle } from '../components/MainTitle/MainTitle'
import { Stepper } from '../components/Stepper/Stepper'
import { GenreType, MusicStep } from '../components/MusicStep/MusicStep'
import { ImageStep, ImageType } from '../components/ImageStep/ImageStep'
import {
  PromptStep,
  StyleType,
  TopicType,
} from '../components/PromptStep/PromptStep'
import axios from 'axios'

import { filterData, filteredDataTostring, moveDataTostring, dataTostringUniversal } from './audio'
import { contentContainer } from '../components/styles.css'
import { title } from './styles.css'
import Link from 'next/link'

const MOVEFN = '1 + 10 * tan(x)'
const FN = '0.9 - 0.4 * tan(x)'

// debug
const is_debug = false;

const CreateVideo = () => {
  const [step, setStep] = useState<'music' | 'image' | 'prompt' | 'complete'>(
    'music'
  )

  const [selection, setSelection] = useState<{
    music?: GenreType
    image?: ImageType
  }>({})

  const [videoPath, setVideoPath] = useState<string>()
  const [progress, setProgress] = useState<number>(-1)

  const handleCreateVideo = async (
    selectedTopic: TopicType,
    selectedStyle: StyleType,
    selectedCamera: string[],
    selectedAudioReactive: 'none' | 'low' | 'medium' | 'high',
    selectedZoom: string[],
    selectedRotate: string[]
  ) => {

    // console.log(selectedCamera, selectedZoom, selectedRotate);
    // debug
    

    // 경로는 public 폴더를 기준으로 상대 경로를 지정합니다.
    const mp3Path = `/audio/${
      selection.music === 'k-pop'
        ? 'ive_iam'
        : selection.music === 'edm'
        ? 'infinity_magic'
        : 'mozart'
    }.mp3`

    // MP3 파일을 가져오기
    const response = await fetch(mp3Path)
    const arrayBuffer = await response.arrayBuffer()

    // ArrayBuffer를 base64로 변환
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )

    // base64를 다시 ArrayBuffer로 변환
    const binaryString = window.atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const base64ArrayBuffer = bytes.buffer

    // base64ArrayBuffer를 AudioBuffer로 디코딩
    const audioContext = new window.AudioContext()
    const audioBuffer = await audioContext.decodeAudioData(base64ArrayBuffer)

    // debug
    let { filteredData: audioData, maxFrames } = filterData(audioBuffer)

    // debug
    if (is_debug) {
      maxFrames = 20;
    }
    

    const audioReactiveValue =
      selectedAudioReactive === 'none'
        ? 1.0
        : selectedAudioReactive === 'low'
        ? 1.03
        : selectedAudioReactive === 'medium'
        ? 1.06
        : 1.09

    let neg_vertical = false
    let neg_horizon = false
    let is_clockwise = 1
    let is_zoom_in = 1

    // rotate: -가 clockwise, +가 counter-clockwise.. 최대값은 4
    if (selectedRotate.includes('clock')) {
      is_clockwise = -1
    }
    // zoom: -가 zoom out, +가 zoom in, 최대값은 1.04
    if (selectedZoom.includes('zoomout')) {
      is_zoom_in = -1
    }
    // moving-direction. -가 down, left, +가 up, right
    if (selectedCamera.includes('down')) {
      neg_vertical = true
    }
    if (selectedCamera.includes('left')) {
      neg_horizon = true
    }

    // data to string
    const strength_schedule = filteredDataTostring(
      audioData,
      FN,
      0,
      2 - audioReactiveValue
    )
    const move_params_vert = moveDataTostring(
      audioData,
      MOVEFN,
      0,
      audioReactiveValue,
      neg_vertical
    )
    const move_params_hori = moveDataTostring(
      audioData,
      MOVEFN,
      0,
      audioReactiveValue,
      neg_horizon
    )

    const zoom_params = dataTostringUniversal(
      audioData,
      "zoom",
      audioReactiveValue,
      is_zoom_in
    )

    const rotate_params = dataTostringUniversal(
      audioData,
      "rotate",
      audioReactiveValue,
      is_clockwise
    )

    const translationY =
      selectedCamera.includes('up') || selectedCamera.includes('down')
        ? move_params_vert
        : '0: (0)'
    const translationX =
      selectedCamera.includes('right') || selectedCamera.includes('left')
        ? move_params_hori
        : '0: (0)'


    // for batch name
    const now = new Date(); // 현재 시간을 나타내는 Date 객체를 생성합니다.

    const year = now.getFullYear(); // 연도를 가져옵니다.
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월을 가져오고 두 자리로 표시합니다.
    const day = String(now.getDate()).padStart(2, '0'); // 일을 가져오고 두 자리로 표시합니다.
    const hours = String(now.getHours()).padStart(2, '0'); // 시를 가져오고 두 자리로 표시합니다.
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 분을 가져오고 두 자리로 표시합니다.
    
    const formattedDate = `${year}${month}${day}-${hours}${minutes}`; // 연월일시분 순서로 문자열을 만듭니다.

    const postRes = await axios
      .create({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .post('/deforum_api/batches', {
        deforum_settings: {
          W: 960,
          H: 540,
          show_info_on_ui: true,
          tiling: false,
          restore_faces: false,
          seed_resize_from_w: 0,
          seed_resize_from_h: 0,
          seed: 2684187885,
          sampler: 'Euler a',
          steps: 20,
          batch_name: `Deforum_api_${formattedDate}`,
          seed_behavior: 'iter',
          seed_iter_N: 1,
          use_init: false,
          strength: 0.8,
          strength_0_no_init: true,
          init_image:
            selection.image === 'cyber-tiger'
              ? 'assets/image/cyber_tiger.png'
              : selection.image === 'dark-city'
              ? 'assets/image/dart_city.png'
              : selection.image === 'dark-space'
              ? 'assets/image/dark_space.png'
              : selection.image === 'gitl-castle'
              ? 'assets/image/gitl_castle.png'
              : selection.image === 'japan-anime'
              ? 'assets/image/japan_anime.png'
              : 'assets/image/martipoo.png',
          use_mask: false,
          use_alpha_as_mask: false,
          mask_file: 'https://deforum.github.io/a1/M1.jpg',
          invert_mask: false,
          mask_contrast_adjust: 1.0,
          mask_brightness_adjust: 1.0,
          overlay_mask: true,
          mask_overlay_blur: 4,
          fill: 1,
          full_res_mask: true,
          full_res_mask_padding: 4,
          reroll_blank_frames: 'ignore',
          reroll_patience: 10.0,
          motion_preview_mode: false,
          prompts: {
            '0': `${selectedTopic.topic} in the style of ${selectedStyle.title} ${selectedStyle.description}`,
          },
          positive_prompts: '',
          negative_prompts: '',
          animation_mode: '2D',
          max_frames: maxFrames,
          border: 'replicate',
          angle: rotate_params,
          zoom: zoom_params,
          translation_x: translationX,
          translation_y: translationY,
          translation_z: '0: (-1)',
          transform_center_x: '0: (0)',
          transform_center_y: '0: (0)',
          rotation_3d_x: '0: (0)',
          rotation_3d_y: '0:(0)',
          rotation_3d_z: '0: (0)',
          enable_perspective_flip: false,
          perspective_flip_theta: '0: (0)',
          perspective_flip_phi: '0: (0)',
          perspective_flip_gamma: '0: (0)',
          perspective_flip_fv: '0: (53)',
          noise_schedule: '0: (0.065)',
          strength_schedule: strength_schedule,
          contrast_schedule: '0: (1.0)',
          cfg_scale_schedule: '0: (7)',
          enable_steps_scheduling: false,
          steps_schedule: '0: (25)',
          fov_schedule: '0: (70)',
          aspect_ratio_schedule: '0: (1)',
          aspect_ratio_use_old_formula: false,
          near_schedule: '0: (200)',
          far_schedule: '0: (10000)',
          seed_schedule: '0:(s), 1:(-1), "max_f-2":(-1), "max_f-1":(s)',
          pix2pix_img_cfg_scale_schedule: '0:(1.5)',
          enable_subseed_scheduling: false,
          subseed_schedule: '0: (1)',
          subseed_strength_schedule: '0: (0)',
          enable_sampler_scheduling: false,
          sampler_schedule: '0: ("Euler a")',
          use_noise_mask: false,
          mask_schedule: '0: ("{video_mask}")',
          noise_mask_schedule: '0: ("{video_mask}")',
          enable_checkpoint_scheduling: false,
          checkpoint_schedule:
            '0: ("model1.ckpt"), 100: ("model2.safetensors")',
          enable_clipskip_scheduling: false,
          clipskip_schedule: '0: (2)',
          enable_noise_multiplier_scheduling: true,
          noise_multiplier_schedule: '0: (1.05)',
          resume_from_timestring: false,
          resume_timestring: '20231122104146',
          enable_ddim_eta_scheduling: false,
          ddim_eta_schedule: '0: (0)',
          enable_ancestral_eta_scheduling: false,
          ancestral_eta_schedule: '0: (1)',
          amount_schedule: '0: (0.1)',
          kernel_schedule: '0: (5)',
          sigma_schedule: '0: (1)',
          threshold_schedule: '0: (0)',
          color_coherence: 'LAB',
          color_coherence_image_path: '',
          color_coherence_video_every_N_frames: 1,
          color_force_grayscale: false,
          legacy_colormatch: false,
          diffusion_cadence: 1,
          optical_flow_cadence: 'None',
          cadence_flow_factor_schedule: '0: (1)',
          optical_flow_redo_generation: 'None',
          redo_flow_factor_schedule: '0: (1)',
          diffusion_redo: '0',
          noise_type: 'perlin',
          perlin_octaves: 4,
          perlin_persistence: 0.5,
          use_depth_warping: true,
          depth_algorithm: 'Midas-3-Hybrid',
          midas_weight: 0.2,
          padding_mode: 'border',
          sampling_mode: 'bicubic',
          save_depth_maps: false,
          video_init_path: 'https://deforum.github.io/a1/V1.mp4',
          extract_nth_frame: 1,
          extract_from_frame: 0,
          extract_to_frame: -1,
          overwrite_extracted_frames: false,
          use_mask_video: false,
          video_mask_path: 'https://deforum.github.io/a1/VM1.mp4',
          hybrid_comp_alpha_schedule: '0:(0.5)',
          hybrid_comp_mask_blend_alpha_schedule: '0:(0.5)',
          hybrid_comp_mask_contrast_schedule: '0:(1)',
          hybrid_comp_mask_auto_contrast_cutoff_high_schedule: '0:(100)',
          hybrid_comp_mask_auto_contrast_cutoff_low_schedule: '0:(0)',
          hybrid_flow_factor_schedule: '0:(1)',
          hybrid_generate_inputframes: false,
          hybrid_generate_human_masks: 'None',
          hybrid_use_first_frame_as_init_image: true,
          hybrid_motion: 'None',
          hybrid_motion_use_prev_img: false,
          hybrid_flow_consistency: false,
          hybrid_consistency_blur: 2,
          hybrid_flow_method: 'RAFT',
          hybrid_composite: 'None',
          hybrid_use_init_image: false,
          hybrid_comp_mask_type: 'None',
          hybrid_comp_mask_inverse: false,
          hybrid_comp_mask_equalize: 'None',
          hybrid_comp_mask_auto_contrast: false,
          hybrid_comp_save_extra_frames: false,
          parseq_manifest: '',
          parseq_use_deltas: true,
          parseq_non_schedule_overrides: true,
          use_looper: false,
          init_images:
            '{\n    "0": "https://deforum.github.io/a1/Gi1.png",\n    "max_f/4-5": "https://deforum.github.io/a1/Gi2.png",\n    "max_f/2-10": "https://deforum.github.io/a1/Gi3.png",\n    "3*max_f/4-15": "https://deforum.github.io/a1/Gi4.jpg",\n    "max_f-20": "https://deforum.github.io/a1/Gi1.png"\n}',
          image_strength_schedule: '0:(0.75)',
          blendFactorMax: '0:(0.35)',
          blendFactorSlope: '0:(0.25)',
          tweening_frames_schedule: '0:(20)',
          color_correction_factor: '0:(0.075)',
          cn_1_overwrite_frames: true,
          cn_1_vid_path: '',
          cn_1_mask_vid_path: '',
          cn_1_enabled: false,
          cn_1_low_vram: false,
          cn_1_pixel_perfect: false,
          cn_1_module: 'none',
          cn_1_model: 'None',
          cn_1_weight: '0:(1)',
          cn_1_guidance_start: '0:(0.0)',
          cn_1_guidance_end: '0:(1.0)',
          cn_1_processor_res: 64,
          cn_1_threshold_a: 64,
          cn_1_threshold_b: 64,
          cn_1_resize_mode: 'Inner Fit (Scale to Fit)',
          cn_1_control_mode: 'Balanced',
          cn_1_loopback_mode: false,
          cn_2_overwrite_frames: true,
          cn_2_vid_path: '',
          cn_2_mask_vid_path: '',
          cn_2_enabled: false,
          cn_2_low_vram: false,
          cn_2_pixel_perfect: false,
          cn_2_module: 'none',
          cn_2_model: 'None',
          cn_2_weight: '0:(1)',
          cn_2_guidance_start: '0:(0.0)',
          cn_2_guidance_end: '0:(1.0)',
          cn_2_processor_res: 64,
          cn_2_threshold_a: 64,
          cn_2_threshold_b: 64,
          cn_2_resize_mode: 'Inner Fit (Scale to Fit)',
          cn_2_control_mode: 'Balanced',
          cn_2_loopback_mode: false,
          cn_3_overwrite_frames: true,
          cn_3_vid_path: '',
          cn_3_mask_vid_path: '',
          cn_3_enabled: false,
          cn_3_low_vram: false,
          cn_3_pixel_perfect: false,
          cn_3_module: 'none',
          cn_3_model: 'None',
          cn_3_weight: '0:(1)',
          cn_3_guidance_start: '0:(0.0)',
          cn_3_guidance_end: '0:(1.0)',
          cn_3_processor_res: 64,
          cn_3_threshold_a: 64,
          cn_3_threshold_b: 64,
          cn_3_resize_mode: 'Inner Fit (Scale to Fit)',
          cn_3_control_mode: 'Balanced',
          cn_3_loopback_mode: false,
          cn_4_overwrite_frames: true,
          cn_4_vid_path: '',
          cn_4_mask_vid_path: '',
          cn_4_enabled: false,
          cn_4_low_vram: false,
          cn_4_pixel_perfect: false,
          cn_4_module: 'none',
          cn_4_model: 'None',
          cn_4_weight: '0:(1)',
          cn_4_guidance_start: '0:(0.0)',
          cn_4_guidance_end: '0:(1.0)',
          cn_4_processor_res: 64,
          cn_4_threshold_a: 64,
          cn_4_threshold_b: 64,
          cn_4_resize_mode: 'Inner Fit (Scale to Fit)',
          cn_4_control_mode: 'Balanced',
          cn_4_loopback_mode: false,
          cn_5_overwrite_frames: true,
          cn_5_vid_path: '',
          cn_5_mask_vid_path: '',
          cn_5_enabled: false,
          cn_5_low_vram: false,
          cn_5_pixel_perfect: false,
          cn_5_module: 'none',
          cn_5_model: 'None',
          cn_5_weight: '0:(1)',
          cn_5_guidance_start: '0:(0.0)',
          cn_5_guidance_end: '0:(1.0)',
          cn_5_processor_res: 64,
          cn_5_threshold_a: 64,
          cn_5_threshold_b: 64,
          cn_5_resize_mode: 'Inner Fit (Scale to Fit)',
          cn_5_control_mode: 'Balanced',
          cn_5_loopback_mode: false,
          skip_video_creation: false,
          fps: 10,
          make_gif: false,
          delete_imgs: true,
          delete_input_frames: false,
          add_soundtrack: 'File',
          soundtrack_path:
            selection.music === 'k-pop'
              ? 'assets/audio/ive_iam.mp3'
              : selection.music === 'edm'
              ? 'assets/audio/infinity_magic.mp3'
              : 'assets/audio/mozart.mp3',
          r_upscale_video: false,
          r_upscale_factor: 'x2',
          r_upscale_model: 'realesr-animevideov3',
          r_upscale_keep_imgs: true,
          store_frames_in_ram: false,
          frame_interpolation_engine: 'None',
          frame_interpolation_x_amount: 2,
          frame_interpolation_slow_mo_enabled: false,
          frame_interpolation_slow_mo_amount: 2,
          frame_interpolation_keep_imgs: true,
          frame_interpolation_use_upscaled: false,
          sd_model_name: 'sd_xl_refiner_1.0_0.9vae.safetensors',
          sd_model_hash: '1e06ed13',
          deforum_git_commit_id: '040da3d8',
        },
      })

    const wait = () => new Promise(resolve => setTimeout(resolve, 3000))

    let path = ''

    while (true) {
      const res = await axios
        .create({
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .get(`/deforum_api/batches/${postRes.data.batch_id}`)

      if (res.data[0].phase_progress === 1.0) {
        path = `${res.data[0].outdir}/${res.data[0].timestring}.mp4`
        setProgress(1)
        break
      } else {
        setProgress(res.data[0].phase_progress)
        await wait()
      }
    }

    setVideoPath(`http://127.0.0.1:7860/deforum_api/show_video/?path=${path}`)
    setStep('complete')
  }

  return (
    <main className={main}>
      <MainTitle />
      <Stepper currentStep={step} />

      {step === 'music' && (
        <MusicStep
          onNextStep={selectedGenre => {
            setStep('image')
            setSelection({
              music: selectedGenre,
            })
          }}
        />
      )}

      {step === 'image' && (
        <ImageStep
          onNextStep={selectedImage => {
            setStep('prompt')
            setSelection({
              ...selection,
              image: selectedImage,
            })
          }}
        />
      )}

      {step === 'prompt' && (
        <PromptStep
          onCreateVideo={async (
            selectedTopic,
            selectedStyle,
            selectedCamera,
            selectedAudioReactive,
            selectedZoom,
            selectedRotate
          ) =>
            await handleCreateVideo(
              selectedTopic,
              selectedStyle,
              selectedCamera,
              selectedAudioReactive,
              selectedZoom,
              selectedRotate
            )
          }
          progress={progress}
        />
      )}

      {step === 'complete' && (
        <div className={contentContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 className={title}>결과물을 확인해 보세요!</h2>
            <Link href="/">처음으로 돌아가기</Link>
          </div>
          <video controls width="1170">
            <source src={videoPath} />
          </video>
        </div>
      )}
    </main>
  )
}

export default CreateVideo
