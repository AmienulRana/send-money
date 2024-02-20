import useStepStore from "@/hooks/useStepStore";
import { IModalConfirm } from "@/interfaces";
import { Button, Flex, Modal, Text } from "@mantine/core";


export default function ModalConfirm({ opened, close }: IModalConfirm) {
  const { nextStep } = useStepStore();
  return (
    <Modal opened={opened} onClose={close} title="Konfirmasi" centered>
      <Text>
        Dengan menekan tombol &apos;Ya, Saya yakin&apos; Anda akan di redirect
        kehalaman pembayaran, Apakah data yang diinput sudah sesuai?
      </Text>

      <Flex align={"center"} justify={"space-between"} gap={10}>
        <Button onClick={close} fullWidth variant="light" type="submit" fw={'normal'} mt={25}>
          Cek Dulu
        </Button>
        <Button fullWidth type="submit" onClick={nextStep} mt={25} fw={'normal'}>
          &apos;Ya, Saya yakin&apos;
        </Button>
      </Flex>
    </Modal>
  );
}
