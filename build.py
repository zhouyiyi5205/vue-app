import os
import time
import zipfile

def zipDir(dirpath,outFullName):
    zip = zipfile.ZipFile(outFullName,"w",zipfile.ZIP_DEFLATED)
    for path,dirnames,filenames in os.walk(dirpath):
        fpath = path.replace(dirpath,'')

        for filename in filenames:
            zip.write(os.path.join(path,filename),os.path.join(fpath,filename))
    zip.close()

def build():
    env = input('input build env (1->test 2->prod):\n')

    if env == '' or env == '1' or env == '2':
        if(env == '' or env == '1'):
            tip = 'Current Env is TEST\n'
            cmd = 'yarn build:test'
            filename = '微信营业厅-测试版-' + time.strftime('%Y%m%d%H%M%S') + '.zip'
        else:
            tip = 'Current Env is PROD\n'
            cmd = 'yarn build:prod'
            filename = '微信营业厅-正式版-' + time.strftime('%Y%m%d%H%M%S') + '.zip'

        print(tip)
        print('-----------build start-----------\n')
        os.system(cmd)
        print('------------build end-----------\n')
        print('-----------zip start-----------\n')
        zipDir('dist', filename)
        print('------------zip end-----------\n')
        os.system('pause')

if __name__ == '__main__':
    build()
