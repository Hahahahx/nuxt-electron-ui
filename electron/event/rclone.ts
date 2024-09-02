export enum RcloneServiceEvent {
  Run = 'rclone-run',
}

export interface RcloneRunParams {
  username: string
  password: string
}
