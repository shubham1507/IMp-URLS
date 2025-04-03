#!/bin/bash
cluster=$1
HZ_old_Version=$2
HZ_Version=$3
hz_ext_version=$4
IFS=','
#value=`echo $hazelstack | tr -d "[],"`
#echo "value is $value"
#read -ra arr <<< "$value"
#for stack in $value
#do
#echo "stack is $stack"
#rpm -evh $value
#done
#yum remove hazelcast-stack
#yum clean all
#yum list hazelcast-stack
#yum -y --nogpgcheck install hazelcast-stack
#cd /opt/mdw/HZ/hazelcast-stack
#./Install_Puppet_HZ.sh $HZ_Version | tee -a /tmp/hazelcast_install_$(date +%Y-%m-%d_%H%M%S).log
#logic to remove deny user
#sed 's/hzadm//g' /etc/ssh/sshd_config
#systemctl restart sshd.service
source /home/hzadm/.bash_profile
HZ_latest_Version=`echo $HZ_Version | cut -d '.' -f-2`
sed -i "0,/$HZ_old_Version/{s/$HZ_old_Version/$HZ_latest_Version/}" /opt/HZ/$cluster/hazelcast-map-config.xml
sed -i "0,/$HZ_old_Version/{s/$HZ_old_Version/$HZ_latest_Version/}" /opt/HZ/$cluster/hazelcast-security-config.xml
sed -i "0,/$HZ_old_Version/{s/$HZ_old_Version/$HZ_latest_Version/}" /opt/HZ/$cluster/hazelcast-includes-config.xml
sed -i "0,/$HZ_old_Version/{s/$HZ_old_Version/$HZ_latest_Version/}" /opt/HZ/$cluster/hazelcast.xml
echo "$HZ_latest_Version Version changes done in hazelcast-map-config.xml, hazelcast-security-config.xml, hazelcast-includes-config.xml and hazelcast.xml files."
cp /home/hzadm/HZ_backup/startContainer.sh /opt/HZ/hazelcast/bin/startContainer.sh
echo "Copy done for startContainer.sh file from backup folder to /opt/HZ/hazelcast/bin/"
cp /home/hzadm/HZ_backup/stopContainer.sh /opt/HZ/hazelcast/bin/stopContainer.sh
echo "Copy done for stopContainer.sh file from backup folder to /opt/HZ/hazelcast/bin/"
cp /home/hzadm/hz-extensions-$hz_ext_version.jar /opt/hz_extensions/hz_extensions.jar
/opt/HZ/hazelcast/bin/changeCluster.sh -cn $cluster -bi hazelcast-enterprise-$HZ_Version
echo "'changeCluster.sh -cn $cluster -bi hazelcast-enterprise-$HZ_Version' command is executed"
exit
