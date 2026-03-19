import Redis from 'ioredis'
import type { Note } from "@/types"
const redis = new Redis()



const initialData: Record<string, string> = {
    "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
    "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
    "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

// 获取所有笔记
export async function getAllNotes(): Promise<Record<string, string>> {
    const data = await redis.hgetall("notes");
    if (Object.keys(data).length == 0) {
        await redis.hset("notes", initialData);
    }
    return await redis.hgetall("notes")
}

// 添加新笔记
export async function addNote(data: string): Promise<string> {
    const uuid = Date.now().toString();
    await redis.hset("notes", uuid, data);
    return uuid
}

// 更新笔记
export async function updateNote(uuid: string, data: string): Promise<void> {
    await redis.hset("notes", uuid, data);
}

// 获取特定笔记
export async function getNote(uuid: string): Promise<Note> {
    const note = await redis.hget("notes", uuid);
    if (!note) {
        throw new Error("Note not found");
    }
    return JSON.parse(note);
}

// 删除笔记
export async function delNote(uuid: string): Promise<number> {
    return redis.hdel("notes", uuid)
}

export default redis