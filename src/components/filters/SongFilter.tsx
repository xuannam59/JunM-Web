import { ISongFilter } from "@/types/song.type";
import { musicGenres } from "@/utils/song.constant";
import { Button, Drawer, Form, Select } from "antd";
import { BaseOptionType } from "antd/es/select";
import { useCallback } from "react";

interface IProps {
    isFilterOpen: boolean;
    artistsSelect: BaseOptionType[];
    onClose: () => void;
    onApply: (values: ISongFilter) => void;
}

const SongFilter = ({ isFilterOpen, onClose, onApply, artistsSelect }: IProps) => {
    const [form] = Form.useForm();

    const handleApply = useCallback(() => {
        form.submit();
    }, [form]);

    return (
        <Drawer
            title="Filter Songs"
            placement="right"
            onClose={onClose}
            open={isFilterOpen}
            extra={
                <div className="flex gap-2">
                    <Button type="primary" onClick={handleApply}>
                        Apply
                    </Button>
                </div>
            }
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onApply}
                initialValues={{
                    artist_id: "",
                    genre: ""
                }}
            >
                <Form.Item
                    label="Artist"
                    name="artist_id"
                >
                    <Select
                        placeholder="Select artist"
                        allowClear
                        options={artistsSelect}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Genre"
                    name="genre"
                >
                    <Select
                        placeholder="Select genre"
                        allowClear
                        options={musicGenres.map(genre => ({
                            label: genre.title,
                            value: genre.title
                        }))}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default SongFilter;